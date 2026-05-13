import { prisma } from "../../client";
import races from "../json/core/core-races.json";

export async function seedCoreRaces() {
  console.log("🧹 Sweeping old core race data...");
  await prisma.race.deleteMany({ where: { isHomebrew: false } });
  console.log("✨ Clean slate ready. Starting seed...");

  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const raceData of races) {
    try {
      // 1. Create the Race
      const race = await prisma.race.create({
        data: {
          name: raceData.name,
          slug: raceData.slug,
          description: raceData.description,
          isHomebrew: false,
          isPublic: raceData.isPublic ?? true,
          sourceName: raceData.sourceName,
        },
      });

      // 2. Process each entry in racialAbilities and create join records
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
                console.warn(`RacialAbility with slug "${slug}" not found`);
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
                console.warn(`Hindrance with slug "${slug}" not found`);
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
                console.warn(`Edge with slug "${slug}" not found`);
              }
            } 
            else {
              console.warn(`Unknown model type "${modelType}" in ${raceData.name}`);
            }
          } catch (err: any) {
            console.error(`Failed to connect ${entry} for ${raceData.name}:`, err);
          }
        }
      }

      console.log(`✅ Seeded race: ${raceData.name}`);
      addedCount++;
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log(`⏭ Skipped race: ${raceData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed race ${raceData.name}:`, err);
        failedCount++;
      }
    }
  }

  console.log("\n📊 Seeding summary:");
  console.log(` ✅ Added: ${addedCount}`);
  console.log(` ⏭ Skipped: ${skippedCount}`);
  console.log(` ❌ Failed: ${failedCount}`);
  console.log(` 📦 Total: ${races.length}`);
  console.log("🌱 Finished seeding core races.");
}

if (require.main === module) {
  seedCoreRaces()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
}