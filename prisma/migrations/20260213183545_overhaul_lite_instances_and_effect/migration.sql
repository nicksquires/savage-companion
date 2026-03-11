/*
  Warnings:

  - You are about to drop the column `endTime` on the `activeeffect` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `activeeffect` table. All the data in the column will be lost.
  - You are about to drop the column `targetType` on the `activeeffect` table. All the data in the column will be lost.
  - You are about to drop the column `special` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `boundTo` on the `artifact` table. All the data in the column will be lost.
  - You are about to drop the column `charges` on the `artifact` table. All the data in the column will be lost.
  - You are about to drop the column `armor` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `pace` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `parry` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `toughness` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `effects` on the `edge` table. All the data in the column will be lost.
  - You are about to drop the column `applicableData` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `triggerType` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `campaignCreatureId` on the `sessioncharacterstate` table. All the data in the column will be lost.
  - You are about to drop the column `durability` on the `tool` table. All the data in the column will be lost.
  - You are about to drop the column `special` on the `tool` table. All the data in the column will be lost.
  - You are about to drop the column `uses` on the `tool` table. All the data in the column will be lost.
  - You are about to drop the `campaigncreature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effectcondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effectmodifier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effectroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `magicdevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `magicdevicespell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playercharactermodifier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spell` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `baseToughness` to the `Creature` table without a default value. This is not possible if the table is not empty.
  - Made the column `sourceName` on table `edge` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `definitions` to the `Effect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trigger` to the `Effect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `activeeffect` DROP FOREIGN KEY `ActiveEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `campaigncreature` DROP FOREIGN KEY `CampaignCreature_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaigncreature` DROP FOREIGN KEY `CampaignCreature_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `edge` DROP FOREIGN KEY `Edge_sourceName_fkey`;

-- DropForeignKey
ALTER TABLE `effectcondition` DROP FOREIGN KEY `EffectCondition_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `effectmodifier` DROP FOREIGN KEY `EffectModifier_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `effectroll` DROP FOREIGN KEY `EffectRoll_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `iteminstance` DROP FOREIGN KEY `ItemInstance_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `magicdevice` DROP FOREIGN KEY `MagicDevice_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `magicdevicespell` DROP FOREIGN KEY `MagicDeviceSpell_magicDeviceId_fkey`;

-- DropForeignKey
ALTER TABLE `magicdevicespell` DROP FOREIGN KEY `MagicDeviceSpell_spellId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharactermodifier` DROP FOREIGN KEY `PlayerCharacterModifier_playerCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `sessioncharacterstate` DROP FOREIGN KEY `SessionCharacterState_campaignCreatureId_fkey`;

-- DropIndex
DROP INDEX `ActiveEffect_effectId_fkey` ON `activeeffect`;

-- DropIndex
DROP INDEX `Edge_sourceName_fkey` ON `edge`;

-- DropIndex
DROP INDEX `SessionCharacterState_campaignCreatureId_fkey` ON `sessioncharacterstate`;

-- AlterTable
ALTER TABLE `activeeffect` DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    DROP COLUMN `targetType`,
    ADD COLUMN `characterInstanceId` VARCHAR(191) NULL,
    ADD COLUMN `creatureInstanceId` VARCHAR(191) NULL,
    ADD COLUMN `remainingDuration` INTEGER NULL,
    ADD COLUMN `sourceItemId` VARCHAR(191) NULL,
    ADD COLUMN `stacks` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `armor` DROP COLUMN `special`;

-- AlterTable
ALTER TABLE `artifact` DROP COLUMN `boundTo`,
    DROP COLUMN `charges`,
    ADD COLUMN `maxCharges` INTEGER NULL;

-- AlterTable
ALTER TABLE `creature` DROP COLUMN `armor`,
    DROP COLUMN `pace`,
    DROP COLUMN `parry`,
    DROP COLUMN `toughness`,
    ADD COLUMN `baseArmor` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `basePace` INTEGER NOT NULL DEFAULT 6,
    ADD COLUMN `baseParry` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `baseToughness` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `edge` DROP COLUMN `effects`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `effectDefinitions` JSON NULL,
    MODIFY `sourceName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `effect` DROP COLUMN `applicableData`,
    DROP COLUMN `triggerType`,
    ADD COLUMN `context` ENUM('WIELDER', 'TARGET', 'ITEM', 'SOURCE', 'AREA') NULL,
    ADD COLUMN `definitions` JSON NOT NULL,
    ADD COLUMN `sourceName` VARCHAR(191) NULL,
    ADD COLUMN `trigger` ENUM('ON_ATTACK', 'ON_HIT', 'ON_RAISE', 'ON_MISS', 'ON_DAMAGE', 'ON_BEING_HIT', 'ON_ITEM_HIT', 'ON_EQUIP', 'ON_UNEQUIP', 'ON_USE', 'PASSIVE') NOT NULL;

-- AlterTable
ALTER TABLE `itemeffect` ADD COLUMN `armorId` VARCHAR(191) NULL,
    ADD COLUMN `artifactId` VARCHAR(191) NULL,
    ADD COLUMN `toolId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `iteminstance` ADD COLUMN `characterInstanceId` VARCHAR(191) NULL,
    ADD COLUMN `creatureInstanceId` VARCHAR(191) NULL,
    ADD COLUMN `isEquipped` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `sessioncharacterstate` DROP COLUMN `campaignCreatureId`,
    ADD COLUMN `creatureInstanceId` VARCHAR(191) NULL,
    ADD COLUMN `fatigue` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `tool` DROP COLUMN `durability`,
    DROP COLUMN `special`,
    DROP COLUMN `uses`,
    ADD COLUMN `maxDurability` INTEGER NULL,
    ADD COLUMN `maxUses` INTEGER NULL,
    ADD COLUMN `skill` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `campaigncreature`;

-- DropTable
DROP TABLE `effectcondition`;

-- DropTable
DROP TABLE `effectmodifier`;

-- DropTable
DROP TABLE `effectroll`;

-- DropTable
DROP TABLE `magicdevice`;

-- DropTable
DROP TABLE `magicdevicespell`;

-- DropTable
DROP TABLE `playercharactermodifier`;

-- DropTable
DROP TABLE `spell`;

-- CreateTable
CREATE TABLE `CharacterInstance` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `bennies` INTEGER NOT NULL DEFAULT 0,
    `powerPoints` INTEGER NULL,
    `shaken` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `CharacterInstance_characterId_key`(`characterId`),
    INDEX `CharacterInstance_campaignId_idx`(`campaignId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureInstance` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `isWildCard` BOOLEAN NOT NULL DEFAULT false,
    `isNpc` BOOLEAN NOT NULL DEFAULT false,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `paceOverride` INTEGER NULL,
    `parryOverride` INTEGER NULL,
    `toughnessOverride` INTEGER NULL,
    `armorOverride` INTEGER NULL,

    INDEX `CreatureInstance_campaignId_idx`(`campaignId`),
    UNIQUE INDEX `CreatureInstance_campaignId_creatureId_key`(`campaignId`, `creatureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityModifier` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` ENUM('PLAYER', 'CREATURE', 'WILDCARD') NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `sourceType` ENUM('POWER', 'ITEM', 'EDGE', 'NARRATIVE', 'SYSTEM') NOT NULL,
    `sourceId` VARCHAR(191) NULL,
    `data` JSON NOT NULL,
    `durationType` ENUM('INSTANT', 'TURN', 'ENCOUNTER', 'SCENE', 'SESSION', 'PERMANENT') NOT NULL,
    `expiresAt` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `creatureInstanceId` VARCHAR(191) NULL,

    INDEX `EntityModifier_entityType_entityId_idx`(`entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ammunition` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `caliber` INTEGER NULL,
    `ap` INTEGER NULL,
    `damageMod` VARCHAR(191) NULL,
    `special` VARCHAR(191) NULL,

    UNIQUE INDEX `Ammunition_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArmorInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemInstanceId` VARCHAR(191) NOT NULL,
    `isDamaged` BOOLEAN NOT NULL DEFAULT false,
    `damagePenalty` INTEGER NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `ArmorInstance_itemInstanceId_key`(`itemInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsumableInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemInstanceId` VARCHAR(191) NOT NULL,
    `remainingUses` INTEGER NOT NULL,
    `isSpoiled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ConsumableInstance_itemInstanceId_key`(`itemInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToolInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemInstanceId` VARCHAR(191) NOT NULL,
    `remainingUses` INTEGER NULL,
    `durability` INTEGER NULL,
    `isBroken` BOOLEAN NOT NULL DEFAULT false,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `ToolInstance_itemInstanceId_key`(`itemInstanceId`),
    INDEX `ToolInstance_isBroken_idx`(`isBroken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtifactInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemInstanceId` VARCHAR(191) NOT NULL,
    `remainingCharges` INTEGER NULL,
    `isAttuned` BOOLEAN NOT NULL DEFAULT false,
    `boundCharacterId` VARCHAR(191) NULL,

    UNIQUE INDEX `ArtifactInstance_itemInstanceId_key`(`itemInstanceId`),
    INDEX `ArtifactInstance_boundCharacterId_idx`(`boundCharacterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Effect_slug_trigger_idx` ON `Effect`(`slug`, `trigger`);

-- CreateIndex
CREATE INDEX `ItemInstance_characterId_idx` ON `ItemInstance`(`characterId`);

-- CreateIndex
CREATE INDEX `ItemInstance_creatureId_idx` ON `ItemInstance`(`creatureId`);

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_creatureInstanceId_fkey` FOREIGN KEY (`creatureInstanceId`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInstance` ADD CONSTRAINT `CharacterInstance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInstance` ADD CONSTRAINT `CharacterInstance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureInstance` ADD CONSTRAINT `CreatureInstance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureInstance` ADD CONSTRAINT `CreatureInstance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityModifier` ADD CONSTRAINT `EntityModifier_creatureInstanceId_fkey` FOREIGN KEY (`creatureInstanceId`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_characterInstanceId_fkey` FOREIGN KEY (`characterInstanceId`) REFERENCES `CharacterInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_creatureInstanceId_fkey` FOREIGN KEY (`creatureInstanceId`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ammunition` ADD CONSTRAINT `Ammunition_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArmorInstance` ADD CONSTRAINT `ArmorInstance_itemInstanceId_fkey` FOREIGN KEY (`itemInstanceId`) REFERENCES `ItemInstance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `Armor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tool`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEffect` ADD CONSTRAINT `ItemEffect_artifactId_fkey` FOREIGN KEY (`artifactId`) REFERENCES `Artifact`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveEffect` ADD CONSTRAINT `ActiveEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveEffect` ADD CONSTRAINT `ActiveEffect_characterInstanceId_fkey` FOREIGN KEY (`characterInstanceId`) REFERENCES `CharacterInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveEffect` ADD CONSTRAINT `ActiveEffect_creatureInstanceId_fkey` FOREIGN KEY (`creatureInstanceId`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumableInstance` ADD CONSTRAINT `ConsumableInstance_itemInstanceId_fkey` FOREIGN KEY (`itemInstanceId`) REFERENCES `ItemInstance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToolInstance` ADD CONSTRAINT `ToolInstance_itemInstanceId_fkey` FOREIGN KEY (`itemInstanceId`) REFERENCES `ItemInstance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtifactInstance` ADD CONSTRAINT `ArtifactInstance_itemInstanceId_fkey` FOREIGN KEY (`itemInstanceId`) REFERENCES `ItemInstance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `itemeffect` RENAME INDEX `ItemEffect_effectId_fkey` TO `ItemEffect_effectId_idx`;
