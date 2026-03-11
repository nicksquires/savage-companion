import { ItemType, SettingType } from "@prisma/client";
import { prisma } from "../../../client";
import consumables from "../../json/core/items/core-consumables.json";

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

interface ConsumableSeed {
  description: string;   // Effect text (healing, buff, etc.)
  maxUses?: number;      // Charges
  isStackable?: boolean;
  setting?: SettingType; // Optional, if you’re scoping by setting
}

interface ConsumableEntry {
  item: ItemSeed;
  consumable: ConsumableSeed;
}

const consumableData = consumables as ConsumableEntry[];

export async function seedCoreConsumables() {
  console.log("🌱 Seeding consumables...");

  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const consumable of consumableData) {
    try {
      await prisma.item.create({
        data: {
          // Item definition
          name: consumable.item.name,
          description: consumable.item.description,
          type: consumable.item.type, // should be CONSUMABLE
          cost: consumable.item.cost,
          weight: consumable.item.weight,
          isHomebrew: consumable.item.isHomebrew ?? false,
          isPublic: consumable.item.isPublic ?? true,
          sourceName: consumable.item.sourceName,

          // Consumable child (1–1)
          consumable: {
            create: {
              description: consumable.consumable.description,
              maxUses: consumable.consumable.maxUses ?? null,
              isStackable: consumable.consumable.isStackable ?? true
            }
          }
        }
      });

      console.log(`✅ Seeded consumable: ${consumable.item.name}`);
      addedCount++;
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log(`⏭ Skipped consumable: ${consumable.item.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(
          `❌ Failed to seed consumable ${consumable.item.name}:`,
          err
        );
        failedCount++;
      }
    }
  }

  const total = consumableData.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding consumables.");
}

if (require.main === module) {
  seedCoreConsumables()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}