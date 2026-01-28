/*
  Warnings:

  - You are about to drop the column `effect` on the `artifact` table. All the data in the column will be lost.
  - You are about to drop the column `effect` on the `consumable` table. All the data in the column will be lost.
  - You are about to drop the column `isDoubleBarrel` on the `firearm` table. All the data in the column will be lost.
  - You are about to drop the `armoreffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weaponeffect` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[effectId]` on the table `Weapon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Artifact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Consumable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effectId` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `armoreffect` DROP FOREIGN KEY `ArmorEffect_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `armoreffect` DROP FOREIGN KEY `ArmorEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `weaponeffect` DROP FOREIGN KEY `WeaponEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `weaponeffect` DROP FOREIGN KEY `WeaponEffect_weaponId_fkey`;

-- AlterTable
ALTER TABLE `activeeffect` MODIFY `startTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `armor` MODIFY `covers` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `artifact` DROP COLUMN `effect`,
    ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `consumable` DROP COLUMN `effect`,
    ADD COLUMN `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `effectbonus` MODIFY `attribute` ENUM('DAMAGE', 'TOUGHNESS', 'PARRY', 'PACE', 'RESISTANCE_BYPASS', 'ILLUMINATION_PENALTY', 'SKILL_ROLL', 'POWER_POINTS', 'ATTACK_ROLL', 'AGILITY_ROLL', 'STEALTH_ROLL', 'CONCEALMENT_ROLL', 'MULTI_ACTION_PENALTY', 'FATIGUE', 'STRENGTH_MINIMUM', 'RATE_OF_FIRE', 'RELOAD_TIME', 'RANGE', 'DAMAGE_ONGOING', 'MOVEMENT_PENALTY', 'SPELLCASTING_ROLL', 'BREAKAGE_CHANCE', 'MALFUNCTION_CHANCE', 'WOUND_MODIFIER', 'BENNY_COST', 'RUN_DIE', 'SIZE_MODIFIER', 'ARMOR_PENETRATION', 'HEALING_ROLL', 'INTIMIDATION_ROLL', 'TAUNT_ROLL', 'NOTICE_ROLL', 'SURVIVAL_ROLL', 'TRACKING_ROLL', 'INITIATIVE_CARD') NULL;

-- AlterTable
ALTER TABLE `firearm` DROP COLUMN `isDoubleBarrel`;

-- AlterTable
ALTER TABLE `weapon` ADD COLUMN `effectId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `armoreffect`;

-- DropTable
DROP TABLE `weaponeffect`;

-- CreateTable
CREATE TABLE `ItemEffect` (
    `itemId` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`itemId`, `effectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Weapon_effectId_key` ON `Weapon`(`effectId`);

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
