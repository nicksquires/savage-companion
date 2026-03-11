/*
  Warnings:

  - You are about to drop the column `firearmType` on the `firearm` table. All the data in the column will be lost.
  - You are about to drop the column `weaponType` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the `effectbonus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `effectbonus` DROP FOREIGN KEY `EffectBonus_effectId_fkey`;

-- DropIndex
DROP INDEX `Firearm_firearmType_mountType_idx` ON `firearm`;

-- AlterTable
ALTER TABLE `firearm` DROP COLUMN `firearmType`;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `weaponType`;

-- DropTable
DROP TABLE `effectbonus`;

-- CreateTable
CREATE TABLE `WeaponCategoryAssignment` (
    `weaponId` VARCHAR(191) NOT NULL,
    `category` ENUM('MELEE', 'RANGED', 'THROWN', 'IMPROVISED', 'FIREARM', 'BLACK_POWDER', 'ENERGY', 'BOW', 'CROSSBOW', 'MAGIC', 'PSIONIC', 'HEAVY', 'LIGHT', 'TWO_HANDED', 'ONE_HANDED', 'REACH', 'CONCEALED', 'AREA', 'SUPPRESSIVE', 'PISTOL', 'RIFLE', 'SHOTGUN', 'SMG', 'CARBINE', 'LAUNCHER', 'MELEE_BLADE', 'MELEE_BLUNT', 'MELEE_PIERCE', 'POLEARM') NOT NULL,

    PRIMARY KEY (`weaponId`, `category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffectModifier` (
    `id` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,
    `stat` VARCHAR(191) NULL,
    `attribute` ENUM('DAMAGE', 'TOUGHNESS', 'PARRY', 'PACE', 'RESISTANCE_BYPASS', 'ILLUMINATION_PENALTY', 'SKILL_ROLL', 'POWER_POINTS', 'ATTACK_ROLL', 'AGILITY_ROLL', 'STEALTH_ROLL', 'CONCEALMENT_ROLL', 'MULTI_ACTION_PENALTY', 'FATIGUE', 'STRENGTH_MINIMUM', 'RATE_OF_FIRE', 'RELOAD_TIME', 'RANGE', 'DAMAGE_ONGOING', 'MOVEMENT_PENALTY', 'SPELLCASTING_ROLL', 'BREAKAGE_CHANCE', 'MALFUNCTION_CHANCE', 'WOUND_MODIFIER', 'BENNY_COST', 'RUN_DIE', 'SIZE_MODIFIER', 'ARMOR_PENETRATION', 'HEALING_ROLL', 'INTIMIDATION_ROLL', 'TAUNT_ROLL', 'NOTICE_ROLL', 'SURVIVAL_ROLL', 'TRACKING_ROLL', 'INITIATIVE_CARD') NULL,
    `value` INTEGER NOT NULL,
    `condition` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Firearm_mountType_idx` ON `Firearm`(`mountType`);

-- AddForeignKey
ALTER TABLE `WeaponCategoryAssignment` ADD CONSTRAINT `WeaponCategoryAssignment_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectModifier` ADD CONSTRAINT `EffectModifier_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
