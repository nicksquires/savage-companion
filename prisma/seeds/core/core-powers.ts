import { prisma } from "../../client";
import { Rank } from "@prisma/client";
import powers from "../json/core/core-powers.json";

export async function seedCorePowers() {
  console.log("🌱 Seeding powers...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const powerData of powers) {
    try {
      // Create power
      const power = await prisma.power.create({
        data: {
          name: powerData.name,
          rank: powerData.rank as Rank,
          powerPoints: powerData.powerPoints,
          trappings: powerData.trappings,
          duration: powerData.duration,
          description: powerData.description,
          summary: powerData.summary,
          modifierData: powerData.modifierData,
          slug: powerData.slug,
          isHomebrew: powerData.isHomebrew,
          isPublic: powerData.isPublic,
          ownerId: powerData.ownerId,
          sourceName: powerData.sourceName,
        },
      });

      // Attach tags (resolve by name)
      for (const tagName of powerData.tags) {
        const tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (tag) {
          await prisma.powerTag.create({
            data: {
              powerId: power.id,
              tagId: tag.id,
            },
          });
        }
      }

      console.log(`✅ Seeded power: ${power.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (power already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped power: ${powerData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed power ${powerData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = powers.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding powers.");
}

// Allow standalone execution
if (require.main === module) {
  seedCorePowers()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}