import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(_req: Request, context: { params: Promise<Record<string, string>> }) {
  const params = await context.params;

  const char = await prisma.playerCharacter.findUnique({
    where: { id: params.id },
    select: { 
      name: true, 
      concept: true,
      raceId: true,
      builderState: true,
      playerCharacterSources: { select: { sourceName: true } },
      skills: { include: { skill: true } } // Fetch relations
    },
  });

  if (!char) return NextResponse.json({});

  // Flatten the relation array back into a string array for Zustand
  const sources = char.playerCharacterSources
    .map((s) => s.sourceName)
    .filter(Boolean) as string[];

  return NextResponse.json({ ...char, sources });
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: characterId } = await context.params;
    const body = await req.json();
    
    // Verify ownership
    const existingChar = await prisma.playerCharacter.findUnique({
      where: { id: characterId },
      select: { userId: true, builderState: true },
    });

    if (!existingChar || existingChar.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    // Safe builderState merge
    let updatedBuilderState: Prisma.InputJsonValue = 
      existingChar.builderState && typeof existingChar.builderState === "object"
        ? existingChar.builderState
        : {};

    if (body.builderState && typeof body.builderState === "object") {
      updatedBuilderState = { ...updatedBuilderState, ...body.builderState };
    }

    // Prepare base update payload
    const updateData: any = {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.concept !== undefined && { concept: body.concept }),
      ...(body.raceId !== undefined && { raceId: body.raceId }),
      ...(body.agility !== undefined && { agility: body.agility }),
      ...(body.smarts !== undefined && { smarts: body.smarts }),
      ...(body.spirit !== undefined && { spirit: body.spirit }),
      ...(body.strength !== undefined && { strength: body.strength }),
      ...(body.vigor !== undefined && { vigor: body.vigor }),
      ...(body.advancementsEnabled !== undefined && { advancementsEnabled: body.advancementsEnabled }),
      ...(body.advancesEarned !== undefined && { advancesEarned: body.advancesEarned }),
      ...(body.advancesUnspent !== undefined && { advancesUnspent: body.advancesUnspent }),
      ...(body.advancesPerRank !== undefined && { advancesPerRank: body.advancesPerRank }),
      ...(body.rank !== undefined && { rank: body.rank }),
      
      builderState: updatedBuilderState,
    };

    // --- RELATION 1: SOURCES ---
    const sourcesToSync = body.sources;
    if (sourcesToSync && Array.isArray(sourcesToSync)) {
      updateData.playerCharacterSources = {
        deleteMany: {}, 
        create: sourcesToSync.map((sourceName: string) => ({
          source: { connect: { name: sourceName } }, 
        })),
      };

      // Wipe ghost data
      if (updateData.builderState && typeof updateData.builderState === "object") {
        const stateObj = { ...updateData.builderState } as Record<string, any>;
        delete stateObj.sources;
        updateData.builderState = stateObj;
      }
    }

    // --- RELATION 2: SKILLS ---
    // Intercept the skills dictionary { "notice": "D6", "stealth": "D4" }
    if (body.skills && typeof body.skills === "object") {
      const skillSlugs = Object.keys(body.skills);

      // Fetch the skill IDs for the provided slugs
      const matchingSkills = await prisma.skill.findMany({
        where: { slug: { in: skillSlugs } },
        select: { id: true, slug: true },
      });

      // Create lookup map: { "notice": "id-123", "stealth": "id-456" }
      const slugToIdMap = matchingSkills.reduce((acc, skill) => {
        acc[skill.slug] = skill.id;
        return acc;
      }, {} as Record<string, string>);

      // Build update payload using the fetched IDs
      updateData.skills = {
        deleteMany: {}, 
        create: Object.entries(body.skills).map(([slug, dieType]) => {
          const skillId = slugToIdMap[slug];
          if (!skillId) return null;
          return {
            dieType: dieType, 
            skill: { connect: { id: skillId } }
          };
        }).filter(Boolean) // filter out nulls returned from safety check..
      };
    }

    // --- RELATION 3: HINDRANCES ---
    if (body.hindrances && Array.isArray(body.hindrances)) {
      const matchingHindrances = await prisma.hindrance.findMany({
        where: { slug: { in: body.hindrances } },
        select: { id: true, slug: true },
      });

      updateData.hindrances = {
        deleteMany: {}, 
        create: matchingHindrances.map((hindrance) => ({
          hindrance: { connect: { id: hindrance.id } }
        }))
      };
    }

    // --- RELATION 4: EDGES ---
    if (body.edges && Array.isArray(body.edges)) {
      // body.edges expects an array of slugs: ["brawny", "alertness"]
      const matchingEdges = await prisma.edge.findMany({
        where: { slug: { in: body.edges } },
        select: { id: true, slug: true },
      });

      updateData.edges = {
        deleteMany: {}, // Clear existing edges to keep it strictly synced with UI
        create: matchingEdges.map((edge) => ({
          edge: { connect: { id: edge.id } }
        }))
      };
    }

    // --- RELATION 5: ARCANE BACKGROUND ---
    if (body.arcaneBackgroundId !== undefined) {
      updateData.arcaneBackgrounds = {
        deleteMany: {}, // Clear any existing AB selections
      };
      // If they passed a real ID (not null), create the new relation
      if (body.arcaneBackgroundId) {
        updateData.arcaneBackgrounds.create = [{
          arcaneBackground: { connect: { id: body.arcaneBackgroundId } }
        }];
      }
    }

    // --- RELATION 6: POWERS ---
    if (body.powers && Array.isArray(body.powers)) {
      // Extract slugs if the frontend sent objects, otherwise use as-is
      const powerSlugs = body.powers.map((p: any) => typeof p === 'string' ? p : p.slug);
      
      const matchingPowers = await prisma.power.findMany({
        where: { slug: { in: powerSlugs } },
        select: { id: true },
      });

      updateData.powers = {
        deleteMany: {}, 
        create: matchingPowers.map((power) => ({
          power: { connect: { id: power.id } }
        }))
      };
    }

    // --- RELATION 7: INVENTORY ---
    if (body.inventory && Array.isArray(body.inventory)) {
      const payloadItemIds = body.inventory.map((i: any) => i.itemId);
      
      // Delete instances the user sold
      await prisma.itemInstance.deleteMany({
        where: {
          characterId: characterId,
          itemId: { notIn: payloadItemIds }
        }
      });

      // Upsert the remaining items
      for (const invItem of body.inventory) {
        const existingInstance = await prisma.itemInstance.findFirst({
          where: { characterId: characterId, itemId: invItem.itemId }
        });

        if (existingInstance) {
          await prisma.itemInstance.update({
            where: { id: existingInstance.id },
            data: { 
              quantity: invItem.quantity,
              isEquipped: invItem.isEquipped ?? false,
            }
          });
        } else {
          await prisma.itemInstance.create({
            data: {
              characterId: characterId,
              itemId: invItem.itemId,
              quantity: invItem.quantity,
              isEquipped: invItem.isEquipped ?? false,
            }
          });
        }
      }
    }

    // --- RELATION 8: ADVANCEMENT LOG ---
    if (body.advancementLog && Array.isArray(body.advancementLog)) {
      updateData.advancementLog = {
        deleteMany: {}, // Clear existing log to mirror the frontend
        create: body.advancementLog.map((adv: any) => ({
          advanceNumber: adv.advanceNumber,
          rankAtTime: adv.rankAtTime,
          type: adv.type,
          // Prisma accepts JSON directly for the payload field
          payload: adv.payload, 
        }))
      };
    }

    // Execute database update
    const updatedChar = await prisma.playerCharacter.update({
      where: { id: characterId },
      data: updateData,
    });

    return NextResponse.json({ success: true, character: updatedChar });
  } catch (error) {
    console.error("Failed to patch draft:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}