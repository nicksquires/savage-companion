/*
  Warnings:

  - You are about to drop the column `effectId` on the `weapon` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Weapon_effectId_key` ON `weapon`;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `effectId`;
