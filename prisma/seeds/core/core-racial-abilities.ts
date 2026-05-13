import { prisma } from "../../client";
import abilities from "../json/core/core-racial-abilities.json";

export async function seedCoreRacialAbilities() {
  console.log("🧹 Sweeping old racial abilities...");

  await prisma.racialAbility.deleteMany({
    where: { isHomebrew: true },
  });

  console.log("✨ Clean slate ready. Starting seed...");
  console.log("🌱 Seeding racial abilities...");

  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const abilityData of abilities) {
    try {
      await prisma.racialAbility.create({
        data: {
          name: abilityData.name,
          slug: abilityData.slug,
          description: abilityData.description,
          value: abilityData.value,
          modifierData: abilityData.modifierData,
          isPublic: true,
          sourceName: "Savage Worlds Adventure Edition", // Uncomment if tracking sources for homebrew
        },
      });

      console.log(`✅ Seeded ability: ${abilityData.name}`);
      addedCount++;
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log(`⏭ Skipped ability: ${abilityData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed ability ${abilityData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = abilities.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding racial abilities.");
}

if (require.main === module) {
  seedCoreRacialAbilities()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}