import { prisma } from "../client";
import { SourceType } from "@prisma/client";
import sources from "./json/sources.json";

export async function seedSources() {
  console.log("🌱 Seeding sources...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const sourceData of sources) {
    try {
      // Create Edge with requirements
      const source = await prisma.source.create({
        data: {
          name: sourceData.name,
          type: sourceData.type as SourceType,
          abbreviation: sourceData.abbreviation,
          description: sourceData.description,
          publisher: sourceData.publisher,
          url: sourceData.url,
          isHomebrew: sourceData.isHomebrew,
        },
      });

      console.log(`✅ Seeded source: ${source.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (edge already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped source: ${sourceData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed source ${sourceData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = sources.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding sources.");
}

// Allow standalone execution
if (require.main === module) {
  seedSources()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}