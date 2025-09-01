/*
  Warnings:

  - You are about to drop the column `parentId` on the `arcanebackground` table. All the data in the column will be lost.
  - You are about to drop the column `characterTemplateId` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `characterTemplateId` on the `campaignedge` table. All the data in the column will be lost.
  - You are about to drop the column `characterTemplateId` on the `campaignhindrance` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `campaignsession` table. All the data in the column will be lost.
  - You are about to drop the column `characterTemplateId` on the `campaignskill` table. All the data in the column will be lost.
  - You are about to drop the column `fatigue` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `wounds` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `edge` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `bennies` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `fatigue` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `gear` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `wounds` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `power` table. All the data in the column will be lost.
  - You are about to drop the column `trapping` on the `power` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `specialability` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the `campaignwildcard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charactertemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardedge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardhindrance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcarditem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardpower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wildcardskill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId,userId,characterId]` on the table `PlayerJournalEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Creature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PlayerCharacterPower` table without a default value. This is not possible if the table is not empty.
  - Made the column `powerPoints` on table `power` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `campaignedge` DROP FOREIGN KEY `CampaignEdge_characterTemplateId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignhindrance` DROP FOREIGN KEY `CampaignHindrance_characterTemplateId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignskill` DROP FOREIGN KEY `CampaignSkill_characterTemplateId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignwildcard` DROP FOREIGN KEY `CampaignWildCard_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignwildcard` DROP FOREIGN KEY `CampaignWildCard_wildCardId_fkey`;

-- DropForeignKey
ALTER TABLE `charactertemplate` DROP FOREIGN KEY `CharacterTemplate_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `playerjournalentry` DROP FOREIGN KEY `PlayerJournalEntry_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `requirement` DROP FOREIGN KEY `Requirement_edgeId_fkey`;

-- DropForeignKey
ALTER TABLE `requirement` DROP FOREIGN KEY `Requirement_edgeReqId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardedge` DROP FOREIGN KEY `WildCardEdge_edgeId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardedge` DROP FOREIGN KEY `WildCardEdge_wildCardId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardhindrance` DROP FOREIGN KEY `WildCardHindrance_hindranceId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardhindrance` DROP FOREIGN KEY `WildCardHindrance_wildCardId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcarditem` DROP FOREIGN KEY `WildCardItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcarditem` DROP FOREIGN KEY `WildCardItem_wildCardId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardpower` DROP FOREIGN KEY `WildCardPower_powerId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardpower` DROP FOREIGN KEY `WildCardPower_wildCardId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardskill` DROP FOREIGN KEY `WildCardSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `wildcardskill` DROP FOREIGN KEY `WildCardSkill_wildCardId_fkey`;

-- DropIndex
DROP INDEX `ArcaneBackground_name_idx` ON `arcanebackground`;

-- DropIndex
DROP INDEX `CampaignEdge_characterTemplateId_fkey` ON `campaignedge`;

-- DropIndex
DROP INDEX `CampaignHindrance_characterTemplateId_fkey` ON `campaignhindrance`;

-- DropIndex
DROP INDEX `CampaignSkill_characterTemplateId_fkey` ON `campaignskill`;

-- DropIndex
DROP INDEX `PlayerJournalEntry_sessionId_userId_key` ON `playerjournalentry`;

-- AlterTable
ALTER TABLE `arcanebackground` DROP COLUMN `parentId`,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `campaign` DROP COLUMN `characterTemplateId`,
    DROP COLUMN `genre`,
    DROP COLUMN `summary`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `startingTemplateId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `campaigncreature` ADD COLUMN `bennies` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `fatigue` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `isNpc` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isWildCard` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `wounds` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `campaignedge` DROP COLUMN `characterTemplateId`;

-- AlterTable
ALTER TABLE `campaignhindrance` DROP COLUMN `characterTemplateId`,
    ADD COLUMN `isEnabled` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `campaignplayercharacter` ADD COLUMN `bennies` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `fatigue` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `wounds` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `campaignpower` ADD COLUMN `customPowerPoints` INTEGER NULL;

-- AlterTable
ALTER TABLE `campaignsession` DROP COLUMN `notes`,
    ADD COLUMN `status` ENUM('PLANNED', 'ACTIVE', 'PAUSED', 'ENDED') NOT NULL DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE `campaignskill` DROP COLUMN `characterTemplateId`;

-- AlterTable
ALTER TABLE `creature` DROP COLUMN `fatigue`,
    DROP COLUMN `parentId`,
    DROP COLUMN `wounds`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `raceId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `edge` DROP COLUMN `parentId`,
    ADD COLUMN `requirements` JSON NULL;

-- AlterTable
ALTER TABLE `gmjournalentry` ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `hindrance` MODIFY `description` TEXT NOT NULL,
    MODIFY `notes` TEXT NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `parentId`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `playercharacter` DROP COLUMN `bennies`,
    DROP COLUMN `fatigue`,
    DROP COLUMN `gear`,
    DROP COLUMN `wounds`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `startingBennies` INTEGER NOT NULL DEFAULT 3,
    MODIFY `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE',
    MODIFY `experience` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `playercharacteritem` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NULL DEFAULT 'D4',
    MODIFY `modifier` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `playercharacterpower` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `playerjournalentry` ADD COLUMN `characterId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `power` DROP COLUMN `parentId`,
    DROP COLUMN `trapping`,
    ADD COLUMN `modifiers` VARCHAR(191) NULL,
    MODIFY `powerPoints` INTEGER NOT NULL,
    MODIFY `duration` VARCHAR(191) NULL,
    MODIFY `effect` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `race` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `sessionevent` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `skill` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `source` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `specialability` DROP COLUMN `parentId`,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `notes` TEXT NULL;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `description`;

-- DropTable
DROP TABLE `campaignwildcard`;

-- DropTable
DROP TABLE `charactertemplate`;

-- DropTable
DROP TABLE `requirement`;

-- DropTable
DROP TABLE `wildcard`;

-- DropTable
DROP TABLE `wildcardedge`;

-- DropTable
DROP TABLE `wildcardhindrance`;

-- DropTable
DROP TABLE `wildcarditem`;

-- DropTable
DROP TABLE `wildcardpower`;

-- DropTable
DROP TABLE `wildcardskill`;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tier` ENUM('FREE', 'BASIC', 'PREMIUM', 'ADMIN') NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `paymentId` VARCHAR(191) NULL,

    INDEX `Subscription_userId_status_idx`(`userId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignGM` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `promotedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CampaignGM_campaignId_idx`(`campaignId`),
    UNIQUE INDEX `CampaignGM_campaignId_userId_key`(`campaignId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignStartingTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `bonuses` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CampaignStartingTemplate_name_ownerId_idx`(`name`, `ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionCharacterState` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `entityType` ENUM('PC', 'CREATURE') NOT NULL,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `conditions` JSON NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `campaignPlayerCharacterId` VARCHAR(191) NULL,
    `campaignCreatureId` VARCHAR(191) NULL,

    INDEX `SessionCharacterState_sessionId_entityId_entityType_idx`(`sessionId`, `entityId`, `entityType`),
    UNIQUE INDEX `SessionCharacterState_sessionId_entityId_entityType_key`(`sessionId`, `entityId`, `entityType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterModifier` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `duration` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PlayerCharacterModifier_playerCharacterId_type_idx`(`playerCharacterId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignAsset` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CampaignAsset_campaignId_name_idx`(`campaignId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    INDEX `CreatureHindrance_creatureId_idx`(`creatureId`),
    UNIQUE INDEX `CreatureHindrance_creatureId_hindranceId_key`(`creatureId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreaturePower` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `customName` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `trapping` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    INDEX `CreaturePower_creatureId_idx`(`creatureId`),
    UNIQUE INDEX `CreaturePower_creatureId_powerId_key`(`creatureId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `ArcaneBackground_name_sourceId_idx` ON `ArcaneBackground`(`name`, `sourceId`);

-- CreateIndex
CREATE INDEX `Campaign_name_ownerId_idx` ON `Campaign`(`name`, `ownerId`);

-- CreateIndex
CREATE INDEX `CampaignCreature_campaignId_creatureId_idx` ON `CampaignCreature`(`campaignId`, `creatureId`);

-- CreateIndex
CREATE INDEX `CampaignEdge_campaignId_idx` ON `CampaignEdge`(`campaignId`);

-- CreateIndex
CREATE INDEX `CampaignHindrance_campaignId_idx` ON `CampaignHindrance`(`campaignId`);

-- CreateIndex
CREATE INDEX `CampaignItem_campaignId_idx` ON `CampaignItem`(`campaignId`);

-- CreateIndex
CREATE INDEX `CampaignPlayerCharacter_campaignId_characterId_idx` ON `CampaignPlayerCharacter`(`campaignId`, `characterId`);

-- CreateIndex
CREATE INDEX `CampaignPower_campaignId_idx` ON `CampaignPower`(`campaignId`);

-- CreateIndex
CREATE INDEX `CampaignSession_campaignId_date_idx` ON `CampaignSession`(`campaignId`, `date`);

-- CreateIndex
CREATE INDEX `CampaignSkill_campaignId_idx` ON `CampaignSkill`(`campaignId`);

-- CreateIndex
CREATE INDEX `CampaignSource_campaignId_idx` ON `CampaignSource`(`campaignId`);

-- CreateIndex
CREATE INDEX `Creature_name_ownerId_sourceId_idx` ON `Creature`(`name`, `ownerId`, `sourceId`);

-- CreateIndex
CREATE INDEX `CreatureAbility_creatureId_idx` ON `CreatureAbility`(`creatureId`);

-- CreateIndex
CREATE INDEX `CreatureEdge_creatureId_idx` ON `CreatureEdge`(`creatureId`);

-- CreateIndex
CREATE INDEX `CreatureItem_creatureId_idx` ON `CreatureItem`(`creatureId`);

-- CreateIndex
CREATE INDEX `CreatureSkill_creatureId_idx` ON `CreatureSkill`(`creatureId`);

-- CreateIndex
CREATE INDEX `CreatureTag_creatureId_idx` ON `CreatureTag`(`creatureId`);

-- CreateIndex
CREATE INDEX `Edge_name_rank_category_sourceId_idx` ON `Edge`(`name`, `rank`, `category`, `sourceId`);

-- CreateIndex
CREATE INDEX `EdgeTag_edgeId_idx` ON `EdgeTag`(`edgeId`);

-- CreateIndex
CREATE INDEX `GMJournalEntry_sessionId_gmId_idx` ON `GMJournalEntry`(`sessionId`, `gmId`);

-- CreateIndex
CREATE INDEX `Hindrance_name_severity_sourceId_idx` ON `Hindrance`(`name`, `severity`, `sourceId`);

-- CreateIndex
CREATE INDEX `Item_name_type_sourceId_idx` ON `Item`(`name`, `type`, `sourceId`);

-- CreateIndex
CREATE INDEX `ItemTag_itemId_idx` ON `ItemTag`(`itemId`);

-- CreateIndex
CREATE INDEX `PlayerCharacter_userId_name_raceId_idx` ON `PlayerCharacter`(`userId`, `name`, `raceId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterArcaneBackground_playerCharacterId_idx` ON `PlayerCharacterArcaneBackground`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterEdge_playerCharacterId_idx` ON `PlayerCharacterEdge`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterHindrance_playerCharacterId_idx` ON `PlayerCharacterHindrance`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterItem_playerCharacterId_idx` ON `PlayerCharacterItem`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterPower_playerCharacterId_idx` ON `PlayerCharacterPower`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerCharacterSkill_playerCharacterId_idx` ON `PlayerCharacterSkill`(`playerCharacterId`);

-- CreateIndex
CREATE INDEX `PlayerJournalEntry_userId_characterId_idx` ON `PlayerJournalEntry`(`userId`, `characterId`);

-- CreateIndex
CREATE UNIQUE INDEX `PlayerJournalEntry_sessionId_userId_characterId_key` ON `PlayerJournalEntry`(`sessionId`, `userId`, `characterId`);

-- CreateIndex
CREATE INDEX `Power_name_rank_sourceId_idx` ON `Power`(`name`, `rank`, `sourceId`);

-- CreateIndex
CREATE INDEX `PowerTag_powerId_idx` ON `PowerTag`(`powerId`);

-- CreateIndex
CREATE INDEX `Race_name_sourceId_ownerId_idx` ON `Race`(`name`, `sourceId`, `ownerId`);

-- CreateIndex
CREATE INDEX `RaceEdge_raceId_idx` ON `RaceEdge`(`raceId`);

-- CreateIndex
CREATE INDEX `RaceHindrance_raceId_idx` ON `RaceHindrance`(`raceId`);

-- CreateIndex
CREATE INDEX `RacePower_raceId_idx` ON `RacePower`(`raceId`);

-- CreateIndex
CREATE INDEX `RaceSkill_raceId_idx` ON `RaceSkill`(`raceId`);

-- CreateIndex
CREATE INDEX `RaceSpecialAbility_raceId_idx` ON `RaceSpecialAbility`(`raceId`);

-- CreateIndex
CREATE INDEX `Skill_name_sourceId_ownerId_idx` ON `Skill`(`name`, `sourceId`, `ownerId`);

-- CreateIndex
CREATE INDEX `SkillTag_skillId_idx` ON `SkillTag`(`skillId`);

-- CreateIndex
CREATE INDEX `Source_name_type_idx` ON `Source`(`name`, `type`);

-- CreateIndex
CREATE INDEX `SpecialAbilityTag_specialAbilityId_idx` ON `SpecialAbilityTag`(`specialAbilityId`);

-- CreateIndex
CREATE INDEX `Tag_name_idx` ON `Tag`(`name`);

-- CreateIndex
CREATE INDEX `users_email_role_idx` ON `users`(`email`, `role`);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_startingTemplateId_fkey` FOREIGN KEY (`startingTemplateId`) REFERENCES `CampaignStartingTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignGM` ADD CONSTRAINT `CampaignGM_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignGM` ADD CONSTRAINT `CampaignGM_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignStartingTemplate` ADD CONSTRAINT `CampaignStartingTemplate_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_campaignPlayerCharacterId_fkey` FOREIGN KEY (`campaignPlayerCharacterId`) REFERENCES `CampaignPlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_campaignCreatureId_fkey` FOREIGN KEY (`campaignCreatureId`) REFERENCES `CampaignCreature`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterModifier` ADD CONSTRAINT `PlayerCharacterModifier_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignAsset` ADD CONSTRAINT `CampaignAsset_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureHindrance` ADD CONSTRAINT `CreatureHindrance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureHindrance` ADD CONSTRAINT `CreatureHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreaturePower` ADD CONSTRAINT `CreaturePower_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreaturePower` ADD CONSTRAINT `CreaturePower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `sessionevent` RENAME INDEX `SessionEvent_sessionId_fkey` TO `SessionEvent_sessionId_idx`;
