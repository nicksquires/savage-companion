import { prisma } from "../../client";
import { Attribute } from "@prisma/client";
import skills from "../json/core/core-skills.json";

export async function seedCoreSkills() {
  console.log("🌱 Seeding skills...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const skillData of skills) {
    try {
      // Create skill
      const skill = await prisma.skill.create({
        data: {
          name: skillData.name,
          slug: skillData.slug,
          linkedAttribute: skillData.linkedAttribute as Attribute,
          description: skillData.description,
          isHomebrew: skillData.isHomebrew,
          isPublic: skillData.isPublic,
          sourceName: skillData.sourceName,
        },
      });

      console.log(`✅ Seeded skill: ${skill.name}`);
      addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (skill already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped skill: ${skillData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed skill ${skillData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = skills.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding skills.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreSkills()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}