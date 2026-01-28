// import { prisma } from "../../../client";
// import weapons from "../../json/core/items/core-weapons.json";

// export async function seedCoreWeapons() {
//   console.log("🌱 Seeding weapons...");

//   // Counters
//   let addedCount = 0;
//   let skippedCount = 0;
//   let failedCount = 0;

//   for (const weaponData of weapons) {
//     try {
//       // Create weapon
//       await prisma.item.create({
//         data: {
//             name: "Colt 1911",
//             description: "A reliable semi-automatic pistol.",
//             type: "WEAPON",
//             cost: 200,
//             weight: 3,
//             isHomebrew: false,
//             isPublic: true,
//             sourceName: "SWADE",

//             weapon: {
//             create: {
//                 damage: "2d6+1",
//                 range: "12/24/48",
//                 rof: 1,
//                 ap: 1,
//                 caliber: 0.45,
//                 special: "armor-piercing, double-tap",
//             }
//             }
//         }
//         });

//       console.log(`✅ Seeded firearm: ${weaponData.item.name}`);
//        addedCount++;
//     } catch (err: any) {
//       // Handle unique constraint violation (weapon already exists)
//       if (err.code === "P2002") {
//         console.log(`⏭ Skipped weapon: ${weaponData.item.name} (already exists)`);
//         skippedCount++;
//       } else {
//         console.error(`❌ Failed to seed weapon ${weaponData.item.name}:`, err);
//         failedCount++;
//       }
//     }
//   }

//   const total = weapons.length;

//   console.log("\n📊 Seeding summary:");
//   console.log(`   ✅ Added:   ${addedCount}`);
//   console.log(`   ⏭ Skipped: ${skippedCount}`);
//   console.log(`   ❌ Failed:  ${failedCount}`);
//   console.log(`   📦 Total:   ${total}`);
//   console.log("🌱 Finished seeding weapons.");
// }

// // Allow standalone execution
// if (require.main === module) {
//   seedCoreWeapons()
//     .then(async () => {
//       await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//     });
// }