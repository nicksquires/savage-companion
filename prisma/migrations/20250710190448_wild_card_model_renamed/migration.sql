/*
  Warnings:

  - You are about to drop the `campaignwildcardcharacter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacteredge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacterhindrance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacteritem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacterpower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardcharacterskill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `campaignwildcardcharacter` DROP FOREIGN KEY `CampaignWildCardCharacter_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignwildcardcharacter` DROP FOREIGN KEY `CampaignWildCardCharacter_wildCardCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacteredge` DROP FOREIGN KEY `WildCardCharacterEdge_edgeId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacteredge` DROP FOREIGN KEY `WildCardCharacterEdge_wildCardCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterhindrance` DROP FOREIGN KEY `WildCardCharacterHindrance_hindranceId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterhindrance` DROP FOREIGN KEY `WildCardCharacterHindrance_wildCardCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacteritem` DROP FOREIGN KEY `WildCardCharacterItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacteritem` DROP FOREIGN KEY `WildCardCharacterItem_wildCardCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterpower` DROP FOREIGN KEY `WildCardCharacterPower_powerId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterpower` DROP FOREIGN KEY `WildCardCharacterPower_wildCardCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterskill` DROP FOREIGN KEY `WildCardCharacterSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardcharacterskill` DROP FOREIGN KEY `WildCardCharacterSkill_wildCardCharacterId_fkey`;

-- DropTable
DROP TABLE `campaignwildcardcharacter`;

-- DropTable
DROP TABLE `wildcardcharacter`;

-- DropTable
DROP TABLE `wildcardcharacteredge`;

-- DropTable
DROP TABLE `wildcardcharacterhindrance`;

-- DropTable
DROP TABLE `wildcardcharacteritem`;

-- DropTable
DROP TABLE `wildcardcharacterpower`;

-- DropTable
DROP TABLE `wildcardcharacterskill`;

-- CreateTable
CREATE TABLE `WildCard` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `concept` VARCHAR(191) NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `arcaneBackground` VARCHAR(191) NULL,
    `rank` ENUM('Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary') NOT NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `advances` INTEGER NOT NULL DEFAULT 0,
    `agility` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `smarts` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `spirit` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `strength` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `vigor` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `pace` INTEGER NOT NULL DEFAULT 6,
    `parry` INTEGER NOT NULL DEFAULT 0,
    `toughness` INTEGER NOT NULL,
    `armor` INTEGER NOT NULL DEFAULT 0,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `gear` JSON NULL,
    `notes` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignWildCard` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignWildCard_campaignId_wildCardId_key`(`campaignId`, `wildCardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardEdge` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `WildCardEdge_wildCardId_edgeId_key`(`wildCardId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardPower` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `customName` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `trapping` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `WildCardPower_wildCardId_powerId_key`(`wildCardId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardSkill` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `WildCardSkill_wildCardId_skillId_key`(`wildCardId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardItem` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `WildCardItem_wildCardId_itemId_key`(`wildCardId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WildCardHindrance_wildCardId_hindranceId_key`(`wildCardId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CampaignWildCard` ADD CONSTRAINT `CampaignWildCard_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignWildCard` ADD CONSTRAINT `CampaignWildCard_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardEdge` ADD CONSTRAINT `WildCardEdge_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardEdge` ADD CONSTRAINT `WildCardEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardPower` ADD CONSTRAINT `WildCardPower_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardPower` ADD CONSTRAINT `WildCardPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardSkill` ADD CONSTRAINT `WildCardSkill_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardSkill` ADD CONSTRAINT `WildCardSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardItem` ADD CONSTRAINT `WildCardItem_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardItem` ADD CONSTRAINT `WildCardItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardHindrance` ADD CONSTRAINT `WildCardHindrance_wildCardId_fkey` FOREIGN KEY (`wildCardId`) REFERENCES `WildCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardHindrance` ADD CONSTRAINT `WildCardHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
