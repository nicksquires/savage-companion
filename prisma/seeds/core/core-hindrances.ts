import { prisma } from "../../client";
import { HindranceType } from "@prisma/client";
import hindrances from "../json/core/core-hindrances.json";

export async function seedCoreHindrances() {
  console.log("🌱 Seeding hindrances...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const hindranceData of hindrances) {
    try {
      // Create hindrance
      const hindrance = await prisma.hindrance.create({
        data: {
          name: hindranceData.name,
          slug: hindranceData.slug,
          severity: hindranceData.severity as HindranceType,
          description: hindranceData.description,
          summary: hindranceData.summary,
          isHomebrew: hindranceData.isHomebrew,
          isPublic: hindranceData.isPublic,
          sourceName: hindranceData.sourceName,
        },
      });

      console.log(`✅ Seeded hindrance: ${hindrance.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (hindrance already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped hindrance: ${hindranceData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed hindrance ${hindranceData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = hindrances.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding hindrances.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreHindrances()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}