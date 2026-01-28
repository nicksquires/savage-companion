import { prisma } from "../../client";
import racialAbilities from "../json/core/core-racial-abilities.json";

export async function seedCoreRacialAbilities() {
  console.log("🌱 Seeding racial abilities...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const racialAbilityData of racialAbilities) {
    try {
      // Create racial ability
      const racialAbility = await prisma.racialAbility.create({
        data: {
          customName: racialAbilityData.customName,
          slug: racialAbilityData.slug,
          value: racialAbilityData.value,
          customDescription: racialAbilityData.customDescription,
          sourceName: racialAbilityData.sourceName,
          maxUses: racialAbilityData.maxUses,
        },
      });

      console.log(`✅ Seeded racial ability: ${racialAbility.customName}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (racial ability already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped racial ability: ${racialAbilityData.customName} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed racial ability ${racialAbilityData.customName}:`, err);
        failedCount++;
      }
    }
  }

  const total = racialAbilities.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding racial abilities.");
}

// Allow standalone execution
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