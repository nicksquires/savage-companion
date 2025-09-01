import { prisma } from "../../client";
import tags from "../json/core/core-tags.json";

export async function seedCoreTags() {
  console.log("🌱 Seeding tags...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const tag of tags) {
    try {
      await prisma.tag.create({
        data: {
          name: tag.name,
        },
      });

      console.log(`✅ Seeded tag: ${tag.name}`);
      addedCount++;
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log(`⏭ Skipped tag: ${tag.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed tag ${tag.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = tags.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding tags.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreTags()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}