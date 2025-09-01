/*
  Warnings:

  - You are about to drop the column `parentId` on the `race` table. All the data in the column will be lost.
  - You are about to drop the `raceedge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `racehindrance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `racepower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `raceskill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `racespecialability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `raceedge` DROP FOREIGN KEY `RaceEdge_edgeId_fkey`;

-- DropForeignKey
ALTER TABLE `raceedge` DROP FOREIGN KEY `RaceEdge_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `racehindrance` DROP FOREIGN KEY `RaceHindrance_hindranceId_fkey`;

-- DropForeignKey
ALTER TABLE `racehindrance` DROP FOREIGN KEY `RaceHindrance_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `racepower` DROP FOREIGN KEY `RacePower_powerId_fkey`;

-- DropForeignKey
ALTER TABLE `racepower` DROP FOREIGN KEY `RacePower_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `raceskill` DROP FOREIGN KEY `RaceSkill_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `raceskill` DROP FOREIGN KEY `RaceSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `racespecialability` DROP FOREIGN KEY `RaceSpecialAbility_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `racespecialability` DROP FOREIGN KEY `RaceSpecialAbility_specialAbilityId_fkey`;

-- AlterTable
ALTER TABLE `race` DROP COLUMN `parentId`;

-- DropTable
DROP TABLE `raceedge`;

-- DropTable
DROP TABLE `racehindrance`;

-- DropTable
DROP TABLE `racepower`;

-- DropTable
DROP TABLE `raceskill`;

-- DropTable
DROP TABLE `racespecialability`;

-- CreateTable
CREATE TABLE `RacialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `maxUses` INTEGER NULL,
    `customName` VARCHAR(191) NULL,
    `customDescription` TEXT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `edgeId` VARCHAR(191) NULL,
    `hindranceId` VARCHAR(191) NULL,
    `skillId` VARCHAR(191) NULL,
    `attribute` VARCHAR(191) NULL,
    `powerId` VARCHAR(191) NULL,
    `specialAbilityId` VARCHAR(191) NULL,
    `bonusAmount` INTEGER NULL,

    INDEX `RacialAbility_raceId_idx`(`raceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
