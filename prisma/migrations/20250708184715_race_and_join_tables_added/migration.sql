/*
  Warnings:

  - You are about to drop the column `race` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `wildcardcharacter` table. All the data in the column will be lost.
  - Added the required column `raceId` to the `PlayerCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceId` to the `WildCardCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playercharacter` DROP COLUMN `race`,
    ADD COLUMN `raceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wildcardcharacter` DROP COLUMN `race`,
    ADD COLUMN `raceId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Race` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `ancestry` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `ownerId` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `parentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Race_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceEdge` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceEdge_raceId_edgeId_key`(`raceId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RacePower` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RacePower_raceId_powerId_key`(`raceId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceSkill` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceSkill_raceId_skillId_key`(`raceId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceSpecialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `specialAbilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceSpecialAbility_raceId_specialAbilityId_key`(`raceId`, `specialAbilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceHindrance_raceId_hindranceId_key`(`raceId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceEdge` ADD CONSTRAINT `RaceEdge_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceEdge` ADD CONSTRAINT `RaceEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacePower` ADD CONSTRAINT `RacePower_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacePower` ADD CONSTRAINT `RacePower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceSkill` ADD CONSTRAINT `RaceSkill_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceSkill` ADD CONSTRAINT `RaceSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceSpecialAbility` ADD CONSTRAINT `RaceSpecialAbility_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceSpecialAbility` ADD CONSTRAINT `RaceSpecialAbility_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceHindrance` ADD CONSTRAINT `RaceHindrance_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceHindrance` ADD CONSTRAINT `RaceHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
