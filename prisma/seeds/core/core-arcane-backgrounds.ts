import { prisma } from "../../client";
import arcaneBackgrounds from "../json/core/core-arcane-backgrounds.json";

export async function seedCoreArcaneBackgrounds() {
  console.log("🌱 Seeding arcane backgrounds...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const bgData of arcaneBackgrounds) {
    try {
      // Create Arcane Background
      const arcaneBackground = await prisma.arcaneBackground.create({
        data: {
          name: bgData.name,
          slug: bgData.slug,
          arcaneSkillSlug: bgData.arcaneSkillSlug,
          startingPowers: bgData.startingPowers,
          powerPoints: bgData.powerPoints,
          description: bgData.description,
          summary: bgData.summary ?? null,
          isHomebrew: bgData.isHomebrew ?? false,
          isPublic: bgData.isPublic ?? true,
          sourceName: bgData.sourceName ?? null,
          // authorId is usually null for core content
        },
      });

      console.log(`✅ Seeded arcane background: ${arcaneBackground.name}`);
      addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (name or slug already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped arcane background: ${bgData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed arcane background ${bgData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = arcaneBackgrounds.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding arcane backgrounds.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreArcaneBackgrounds()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}