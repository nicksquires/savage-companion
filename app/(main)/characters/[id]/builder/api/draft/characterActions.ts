"use server";

import { prisma } from "@/prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CharacterDraft } from "@/lib/types/CharacterBuilder";

export async function createNewCharacter() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const existingDraft = await prisma.playerCharacter.findFirst({
    where: { userId: session.user.id, builderState: { not: undefined } },
  });

  if (existingDraft) {
    redirect(`/characters/${existingDraft.id}/builder/concept`);
  }

  // 1. Fetch default Human race WITH its explicit relations
  const defaultRace = await prisma.race.findFirst({
    where: { name: "Human" },
    include: {
      raceRacialAbilities: { include: { racialAbility: true } },
      raceHindrances:      { include: { hindrance: true } },
      raceEdges:           { include: { edge: true } },
    }
  });

  if (!defaultRace) throw new Error("Default Human race not found.");

  // 2. Flatten relations into expandedAbilities format
  // const expandedAbilities = [
  //   ...defaultRace.raceRacialAbilities.map(rra => ({ ...rra.racialAbility, _type: 'ability' })),
  //   ...defaultRace.raceHindrances.map(rh => ({ ...rh.hindrance, _type: 'hindrance' })),
  //   ...defaultRace.raceEdges.map(re => ({ ...re.edge, _type: 'edge' }))
  // ];
  const expandedAbilities = [
  ...defaultRace.raceRacialAbilities.map(rra => ({
    ...rra.racialAbility,
    _type: 'ability' as const,
  })),

  ...defaultRace.raceHindrances.map(rh => ({
    id: rh.hindrance.id,
    name: rh.hindrance.name,
    slug: rh.hindrance.slug,
    severity: rh.hindrance.severity,
    description: rh.hindrance.description,
    summary: rh.hindrance.summary,
    modifierData: rh.hindrance.modifierData,
    value: undefined,
    _type: 'hindrance' as const,
  })),

  ...defaultRace.raceEdges.map(re => ({
    ...re.edge,
    _type: 'edge' as const,
  })),
];

  const newChar = await prisma.playerCharacter.create({
    data: {
      userId: session.user.id,
      name: "",
      concept: "",
      raceId: defaultRace.id,
      rank: "NOVICE",
      agility: "D4",
      smarts: "D4",
      spirit: "D4",
      strength: "D4",
      vigor: "D4",
      skills: {
        create: [
          { skill: { connect: { slug: 'athletics' } }, dieType: 'D4' },
          { skill: { connect: { slug: 'common-knowledge' } }, dieType: 'D4' },
          { skill: { connect: { slug: 'notice' } }, dieType: 'D4' },
          { skill: { connect: { slug: 'persuasion' } }, dieType: 'D4' },
          { skill: { connect: { slug: 'stealth' } }, dieType: 'D4' },
        ]
      },
      builderState: {
        availableAttributePoints: 5,
        availableSkillPoints: 12,
        hindrancePointsUsed: 0,
        attributePointsUsed: 0,
        skillPointsUsed: 0,
        startingWealth: 500,

        validationState: { isValid: true, errors: {}, tabStates: {} },
        racialAbilities: expandedAbilities, // HYDRATE INITIAL RACE MODIFIERS
      },
    },
  });

  redirect(`/characters/${newChar.id}/builder/concept`);
}

export async function saveCharacter(characterId: string, draft: CharacterDraft) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const character = await prisma.playerCharacter.update({
    where: { id: characterId, userId: session.user.id },
    data: {
      name: draft.name,
      concept: draft.concept || null,
      raceId: draft.raceId,
      imageUrl: draft.imageUrl || null,
      campaignId: draft.campaignId || null,

      agility: draft.attributes.AGILITY,
      smarts: draft.attributes.SMARTS,
      spirit: draft.attributes.SPIRIT,
      strength: draft.attributes.STRENGTH,
      vigor: draft.attributes.VIGOR,

      skills: {
        deleteMany: {},
        create: Object.entries(draft.skills).map(([skillId, die]) => ({
          skill: { connect: { id: skillId } },
          dieType: die,
        })),
      },

      hindrances: {
        deleteMany: {},
        create: draft.hindrances.map((h) => ({
          hindrance: { connect: { id: h.id } },
        })),
      },

      edges: {
        deleteMany: {},
        create: draft.edges.map((e) => ({
          edge: { connect: { id: e.id } },
        })),
      },

      arcaneBackgrounds: {
        deleteMany: {},
        ...(draft.arcaneBackgroundId && {
          create: [{ arcaneBackground: { connect: { id: draft.arcaneBackgroundId } } }],
        }),
      },

      powers: {
        deleteMany: {},
        ...(draft.powers?.length && {
          create: draft.powers.map((power) => ({
            power: { connect: { id: power.id } },
          })),
        }),
      },

      inventory: {
        deleteMany: {},
        create: draft.inventory.map((item) => ({
          item: { connect: { id: item.itemId } },
          quantity: item.quantity,
        })),
      },

      builderState: undefined, // Clearing draft state finalizes character
    },
  });

  revalidatePath("/characters");
  redirect(`/characters/${character.id}/sheet`);
}

export async function deleteCharacter(characterId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const char = await prisma.playerCharacter.findUnique({
    where: { id: characterId, userId: session.user.id }, // Security: Ensure user owns it
    select: { builderState: true },
  });
  
  if (!char) return;

  if (char.builderState !== null) {
    // Hard delete for drafts
    await prisma.playerCharacter.delete({ where: { id: characterId } });
  } else {
    // Soft delete for active characters
    await prisma.playerCharacter.update({
      where: { id: characterId },
      data: { isActive: false },
    });
  }

  // Tell Next.js to purge the cache for the characters page so it updates instantly
  revalidatePath("/characters"); 
}

export async function getUserRegisteredSources(characterId: string) {
  "use server";

  // Security + ownership check
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { userId: true },
  });

  if (!character?.userId) {
    return ["Savage Worlds Adventure Edition"]; // safe fallback
  }

const user = await prisma.user.findUnique({
    where: { id: character.userId },
    select: {
      registeredSources: {
        select: { sourceName: true },
      },
    },
  });

  const sources = user?.registeredSources.map((s) => s.sourceName) || [];
  
  // Ensure the core rulebook is always an option even if they haven't explicitly registered it
  if (!sources.includes("Savage Worlds Adventure Edition")) {
    sources.unshift("Savage Worlds Adventure Edition");
  }

  return sources;
}

export async function getAvailableRaces(characterId: string) {
  "use server";
  
  // Fetch active sources
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });

  if (!character) return [];

  const activeSources = character.playerCharacterSources
    .map(s => s.sourceName)
    .filter(Boolean) as string[];

  // Fetch races WITH their explicit relations
  const races = await prisma.race.findMany({
    where: {
      OR: [
        { sourceName: { in: activeSources } },
        // { isPublic: true }, // fallback
      ],
    },
    orderBy: { name: "asc" },
    include: {
      raceRacialAbilities: { include: { racialAbility: true } },
      raceHindrances:      { include: { hindrance: true } },
      raceEdges:           { include: { edge: true } },
    }
  });

  // Flatten the relations into a unified array for the UI and Rules Engine
  const racesWithExpandedAbilities = races.map((race) => {
    // We tag them with '_type' just in case the UI wants to render them differently (e.g., red for hindrances)
    const expandedAbilities = [
  ...race.raceRacialAbilities.map(rra => ({
    ...rra.racialAbility,
    _type: 'ability' as const,
  })),

  ...race.raceHindrances.map(rh => ({
    id: rh.hindrance.id,
    name: rh.hindrance.name,
    slug: rh.hindrance.slug,
    severity: rh.hindrance.severity,
    description: rh.hindrance.description,
    summary: rh.hindrance.summary,
    modifierData: rh.hindrance.modifierData,
    value: undefined,
    _type: 'hindrance' as const,
  })),

  ...race.raceEdges.map(re => ({
    ...re.edge,
    _type: 'edge' as const,
  })),
];

    // Strip out the raw relational arrays so we don't send massive payloads to the client
    const { raceRacialAbilities, raceHindrances, raceEdges, ...cleanRace } = race;

    return {
      ...cleanRace,
      expandedAbilities,
    };
  });

  return racesWithExpandedAbilities;
}

export async function getAvailableSkills(characterId: string) {
  "use server";
  
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });

  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  const skills = await prisma.skill.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, 
    //  { isPublic: true }
    ] },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true, linkedAttribute: true }
  });

  return skills;
}

export async function getAvailableHindrances(characterId: string) {
  "use server";
  
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });

  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  const hindrances = await prisma.hindrance.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, { isPublic: true }] },
    orderBy: { name: "asc" },
    // Fetching the whole payload so we have the descriptions and modifierData
  });

  return hindrances;
}

export async function getAvailableEdges(characterId: string) {
  "use server";
  
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });

  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  const edges = await prisma.edge.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, { isPublic: true }] },
    orderBy: { name: "asc" },
  });

  return edges;
}

export async function getAvailableArcaneBackgrounds(characterId: string) {
  "use server";
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });
  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  return await prisma.arcaneBackground.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, { isPublic: true }] },
    orderBy: { name: "asc" },
  });
}

export async function getAvailablePowers(characterId: string) {
  "use server";
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });
  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  return await prisma.power.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, { isPublic: true }] },
    orderBy: { name: "asc" },
  });
}

export async function getAvailableItems(characterId: string) {
  "use server";
  const character = await prisma.playerCharacter.findUnique({
    where: { id: characterId },
    select: { playerCharacterSources: { select: { sourceName: true } } }
  });
  if (!character) return [];
  const activeSources = character.playerCharacterSources.map(s => s.sourceName).filter(Boolean) as string[];

  // Fetch items and include their specific mechanical data
  return await prisma.item.findMany({
    where: { OR: [{ sourceName: { in: activeSources } }, { isPublic: true }] },
    include: {
      weapon: { include: { firearm: true } },
      armor: true,
      consumable: true,
      tool: true,
      artifact: true,
      ammunition: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getRaceNameById(raceId: string) {
  try {
    const race = await prisma.race.findUnique({
      where: { id: raceId },
      select: { id: true, name: true }
    });
    return race;
  } catch (error) {
    console.error("Failed to fetch race:", error);
    return null;
  }
}