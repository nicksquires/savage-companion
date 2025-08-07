/*
  Warnings:

  - You are about to alter the column `type` on the `item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(16))`.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `type` ENUM('Weapon', 'Armor', 'Gear', 'Consumable', 'Tool', 'Misc') NOT NULL;
