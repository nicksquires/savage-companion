/*
  Warnings:

  - You are about to drop the column `uses` on the `consumable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `consumable` DROP COLUMN `uses`,
    ADD COLUMN `isStackable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `maxUses` INTEGER NULL;

-- AlterTable
ALTER TABLE `weapon` ADD COLUMN `setting` ENUM('MEDIEVAL', 'MODERN', 'FUTURISTIC') NULL,
    ADD COLUMN `weaponType` ENUM('MELEE', 'RANGED', 'IMPROVISED') NULL;
