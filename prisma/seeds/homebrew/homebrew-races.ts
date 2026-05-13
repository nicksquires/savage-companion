import { prisma } from "../../client";
import races from "../json/homebrew/homebrew-races.json";

export async function seedHomebrewRaces() {
  console.log("🧹 Sweeping old homebrew race data...");

  await prisma.race.deleteMany({
    where: { isHomebrew: true },
  });

  console.log("✨ Clean slate ready. Starting seed...");

  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const raceData of races) {
    try {
      // 1. Create the Race record
      const race = await prisma.race.create({
        data: {
          name: raceData.name,
          slug: raceData.slug,
          description: raceData.description,
          isHomebrew: true,           // Homebrew flag
          isPublic: raceData.isPublic ?? true,
          sourceName: null,           // No source for homebrew
        },
      });

      // 2. Process each racialAbility entry and create the proper join record
      if (raceData.racialAbilities?.length) {
        for (const entry of raceData.racialAbilities) {
          const [modelType, slug] = entry.split(":") as [string, string];

          if (!modelType || !slug) {
            console.warn(`Invalid format "${entry}" in ${raceData.name}`);
            continue;
          }

          try {
            if (modelType === "racial-ability") {
              const target = await prisma.racialAbility.findUnique({ where: { slug } });
              if (target) {
                await prisma.raceRacialAbility.create({
                  data: {
                    raceId: race.id,
                    racialAbilityId: target.id,
                  },
                });
              } else {
                console.warn(`RacialAbility with slug "${slug}" not found for homebrew race ${raceData.name}`);
              }
            } 
            else if (modelType === "hindrance") {
              const target = await prisma.hindrance.findUnique({ where: { slug } });
              if (target) {
                await prisma.raceHindrance.create({
                  data: {
                    raceId: race.id,
                    hindranceId: target.id,
                  },
                });
              } else {
                console.warn(`Hindrance with slug "${slug}" not found for homebrew race ${raceData.name}`);
              }
            } 
            else if (modelType === "edge") {
              const target = await prisma.edge.findUnique({ where: { slug } });
              if (target) {
                await prisma.raceEdge.create({
                  data: {
                    raceId: race.id,
                    edgeId: target.id,
                  },
                });
              } else {
                console.warn(`Edge with slug "${slug}" not found for homebrew race ${raceData.name}`);
              }
            } 
            else {
              console.warn(`Unknown model type "${modelType}" in homebrew race ${raceData.name}`);
            }
          } catch (connectErr: any) {
            if (connectErr.code === "P2025") {
              console.warn(`Record not found for "${entry}" in homebrew race ${raceData.name}`);
            } else {
              console.error(`Failed to connect ${entry} for ${raceData.name}:`, connectErr);
            }
          }
        }
      }

      console.log(`✅ Seeded homebrew race: ${raceData.name}`);
      addedCount++;
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log(`⏭ Skipped homebrew race: ${raceData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed homebrew race ${raceData.name}:`, err);
        failedCount++;
      }
    }
  }

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${races.length}`);
  console.log("🌱 Finished seeding homebrew races.");
}

if (require.main === module) {
  seedHomebrewRaces()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
}