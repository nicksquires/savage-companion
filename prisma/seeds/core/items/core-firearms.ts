import { FirearmMountType, FirearmType, ItemType } from "@prisma/client";
import { prisma } from "../../../client";
import firearms from "../../json/core/items/core-firearms.json";

interface ItemSeed {
  name: string;
  description: string;
  type: ItemType;
  cost?: number;
  weight?: number;
  isHomebrew?: boolean;
  isPublic?: boolean;
  sourceName?: string;
}

interface WeaponSeed {
  damage?: string;
  range?: string;
  rof?: number;
  ap?: number;
  caliber?: number;
}

interface FirearmSeed {
  firearmType: FirearmType;
  ammoCapacity?: number;
  reloadActions?: number;
  mountType?: FirearmMountType;
  blastTemplate?: string;
  overchargeDie?: string;
  specialAmmo?: string;
}

interface FirearmEntry {
  item: ItemSeed;
  weapon: WeaponSeed;
  firearm: FirearmSeed;
}

const firearmData = firearms as FirearmEntry[];

export async function seedCoreFirearms() {
  console.log("🌱 Seeding firearms...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const firearmData of firearms as FirearmEntry[]) {
    try {
      // Create firearm
      await prisma.item.create({
          data: {
        // Item
        name: firearmData.item.name,
        description: firearmData.item.description,
        type: firearmData.item.type as ItemType, // should already be "WEAPON"
        cost: firearmData.item.cost,
        weight: firearmData.item.weight,
        isHomebrew: firearmData.item.isHomebrew,
        isPublic: firearmData.item.isPublic,
        sourceName: firearmData.item.sourceName,

        // Weapon (1–1 optional child)
        weapon: {
          create: {
            damage: firearmData.weapon.damage,
            range: firearmData.weapon.range,
            rof: firearmData.weapon.rof,
            ap: firearmData.weapon.ap,
            caliber: firearmData.weapon.caliber,

            // Firearm (child of Weapon)
            firearm: {
                  create: {
                    firearmType: firearmData.firearm.firearmType as FirearmType,
                    ammoCapacity: firearmData.firearm.ammoCapacity,
                    reloadActions: firearmData.firearm.reloadActions,
                    mountType: firearmData.firearm.mountType as FirearmMountType,
                    blastTemplate: firearmData.firearm.blastTemplate ?? null,
                    overchargeDie: firearmData.firearm.overchargeDie ?? null,
                    specialAmmo: firearmData.firearm.specialAmmo ?? null
                  } 
                }
              }
            }
          }
      });
      
      console.log(`✅ Seeded firearm: ${firearmData.item.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (firearm already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped firearm: ${firearmData.item.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed firearm ${firearmData.item.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = firearms.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding firearms.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreFirearms()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}