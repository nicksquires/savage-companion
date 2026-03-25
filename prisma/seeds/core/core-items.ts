import { prisma } from "../../client";
import { WeaponCategory } from "@prisma/client";
import items from "../json/core/core-items.json";

export async function seedCoreItems() {

  // PRE-SEED CLEAN SWEEP
  console.log("🧹 Sweeping old item data...");
  
  // Delete child records first to satisfy foreign key constraints
  await prisma.ammunition.deleteMany();
  await prisma.weaponCategoryAssignment.deleteMany();
  await prisma.firearm.deleteMany();
  await prisma.weapon.deleteMany();
  // Add these if they exist and don't have cascade delete:
  // await prisma.armor.deleteMany(); 
  // await prisma.consumable.deleteMany();
  // await prisma.tool.deleteMany();

  // Delete the parent items
  await prisma.item.deleteMany();

  console.log("✨ Clean slate ready. Starting seed...");

  // SEED START
  console.log("🌱 Seeding core items...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const itemData of items) {
    try {
      // Build the base Item payload
      const itemPayload: any = {
        name: itemData.name,
        description: itemData.description,
        type: itemData.type,
        cost: itemData.cost,
        weight: itemData.weight,
        isHomebrew: itemData.isHomebrew,
        isPublic: itemData.isPublic,
        sourceName: itemData.sourceName,
      };

      // ── NESTED RELATIONS (Prisma create syntax) ──
      // ── WEAPON + CATEGORIES ──
      if (itemData.weapon) {
        itemPayload.weapon = {
          create: {
            ...itemData.weapon,           // damage, range, rof, ap, etc.
            // Transform simple array → Prisma relation
            categories: {
              create: itemData.weapon.categories.map((cat: string) => ({
                category: cat as WeaponCategory,
              })),
            },
            // Firearm stays nested inside Weapon (unchanged)
            ...(itemData.firearm && {
              firearm: {
                create: itemData.firearm,
              },
            }),
          },
        };
    }

      // Armor, Consumable, Tool, Artifact, Ammunition blocks
      if (itemData.armor) itemPayload.armor = { create: itemData.armor };
      if (itemData.consumable) itemPayload.consumable = { create: itemData.consumable };
      if (itemData.tool) itemPayload.tool = { create: itemData.tool };
      if (itemData.ammunitions) itemPayload.ammunitions = { create: itemData.ammunitions };
      // if (itemData.artifact) itemPayload.artifact = { create: itemData.artifact };

      // Create the full item with all nested data in one transaction
      await prisma.item.create({
        data: itemPayload,
      });

      console.log(`✅ Seeded item: ${itemData.name}`);
      addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (item already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped item: ${itemData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed item ${itemData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = items.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding core items.");
}

// Allow standalone execution (e.g. ts-node prisma/seeds/core/core-items.ts)
if (require.main === module) {
  seedCoreItems()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}