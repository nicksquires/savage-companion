import { prisma } from "../../client";
import effects from "../json/core/core-effects.json";

export async function seedCoreEffects() {
  console.log("🌱 Seeding effects...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const effectData of effects) {
    try {
      // Create effect
      const effect = await prisma.effect.create({
        data: {
          name: effectData.name,
          slug: effectData.slug,
          description: effectData.description,
          // definitions: effectData.definitions
        },
      });

      console.log(`✅ Seeded effect: ${effect.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (effect already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped effect: ${effectData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed effect ${effectData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = effects.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding effects.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreEffects()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}