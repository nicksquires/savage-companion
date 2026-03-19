/*
  Warnings:

  - You are about to drop the column `special` on the `ammunition` table. All the data in the column will be lost.
  - You are about to drop the column `effectDefinitions` on the `edge` table. All the data in the column will be lost.
  - You are about to drop the column `creatureInstanceId` on the `entitymodifier` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `entitymodifier` table. All the data in the column will be lost.
  - The values [WILDCARD] on the enum `EntityModifier_entityType` will be removed. If these variants are still used in the database, this will fail.
  - The values [INSTANT,TURN,SCENE,SESSION] on the enum `EntityModifier_durationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `campaignId` on the `iteminstance` table. All the data in the column will be lost.
  - You are about to drop the column `modifiers` on the `power` table. All the data in the column will be lost.
  - You are about to drop the column `attribute` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the column `customDescription` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the column `customName` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the column `maxUses` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the `activeeffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `armorinstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artifactinstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaignitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consumableinstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creatureitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effectcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `firearminstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemeffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playercharacteritem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `toolinstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weaponinstance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `RacialAbility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `activeeffect` DROP FOREIGN KEY `ActiveEffect_characterInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `activeeffect` DROP FOREIGN KEY `ActiveEffect_creatureInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `activeeffect` DROP FOREIGN KEY `ActiveEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `armorinstance` DROP FOREIGN KEY `ArmorInstance_itemInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `artifactinstance` DROP FOREIGN KEY `ArtifactInstance_itemInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignitem` DROP FOREIGN KEY `CampaignItem_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignitem` DROP FOREIGN KEY `CampaignItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `consumableinstance` DROP FOREIGN KEY `ConsumableInstance_itemInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `creatureitem` DROP FOREIGN KEY `CreatureItem_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `creatureitem` DROP FOREIGN KEY `CreatureItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `effect` DROP FOREIGN KEY `Effect_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `effectcategory` DROP FOREIGN KEY `EffectCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `effectcategory` DROP FOREIGN KEY `EffectCategory_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `entitymodifier` DROP FOREIGN KEY `EntityModifier_creatureInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `firearminstance` DROP FOREIGN KEY `FirearmInstance_weaponInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_artifactId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `ItemEffect_toolId_fkey`;

-- DropForeignKey
ALTER TABLE `iteminstance` DROP FOREIGN KEY `ItemInstance_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacteritem` DROP FOREIGN KEY `PlayerCharacterItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacteritem` DROP FOREIGN KEY `PlayerCharacterItem_playerCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `toolinstance` DROP FOREIGN KEY `ToolInstance_itemInstanceId_fkey`;

-- DropForeignKey
ALTER TABLE `weaponinstance` DROP FOREIGN KEY `WeaponInstance_itemInstanceId_fkey`;

-- DropIndex
DROP INDEX `EntityModifier_creatureInstanceId_fkey` ON `entitymodifier`;

-- DropIndex
DROP INDEX `EntityModifier_entityType_entityId_idx` ON `entitymodifier`;

-- DropIndex
DROP INDEX `ItemInstance_itemId_campaignId_idx` ON `iteminstance`;

-- AlterTable
ALTER TABLE `ammunition` DROP COLUMN `special`,
    ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `armor` ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `edge` DROP COLUMN `effectDefinitions`,
    ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `entitymodifier` DROP COLUMN `creatureInstanceId`,
    DROP COLUMN `expiresAt`,
    ADD COLUMN `condition` JSON NULL,
    ADD COLUMN `creatureInstanceid` VARCHAR(191) NULL,
    ADD COLUMN `durationRemaining` INTEGER NULL,
    ADD COLUMN `priority` INTEGER NOT NULL DEFAULT 0,
    MODIFY `entityType` ENUM('PLAYER', 'CREATURE', 'ITEM', 'ENTITY') NOT NULL,
    MODIFY `sourceType` ENUM('POWER', 'ITEM', 'EDGE', 'ABILITY', 'NARRATIVE', 'SYSTEM') NOT NULL,
    MODIFY `durationType` ENUM('ROUNDS', 'MINUTES', 'HOURS', 'ENCOUNTER', 'PERMANENT') NOT NULL;

-- AlterTable
ALTER TABLE `hindrance` ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `iteminstance` DROP COLUMN `campaignId`,
    ADD COLUMN `containerId` VARCHAR(191) NULL,
    ADD COLUMN `state` JSON NOT NULL;

-- AlterTable
ALTER TABLE `power` DROP COLUMN `modifiers`,
    ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `racialability` DROP COLUMN `attribute`,
    DROP COLUMN `customDescription`,
    DROP COLUMN `customName`,
    DROP COLUMN `maxUses`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `modifierData` JSON NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `source` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `weapon` MODIFY `setting` ENUM('MEDIEVAL', 'MODERN', 'WESTERN', 'KIDS_ON_BIKES', 'SLASHER', 'HORROR', 'FUTURISTIC', 'ANCIENT_TIMES', 'OTHERWORLD') NULL;

-- DropTable
DROP TABLE `activeeffect`;

-- DropTable
DROP TABLE `armorinstance`;

-- DropTable
DROP TABLE `artifactinstance`;

-- DropTable
DROP TABLE `campaignitem`;

-- DropTable
DROP TABLE `consumableinstance`;

-- DropTable
DROP TABLE `creatureitem`;

-- DropTable
DROP TABLE `effect`;

-- DropTable
DROP TABLE `effectcategory`;

-- DropTable
DROP TABLE `firearminstance`;

-- DropTable
DROP TABLE `itemeffect`;

-- DropTable
DROP TABLE `playercharacteritem`;

-- DropTable
DROP TABLE `toolinstance`;

-- DropTable
DROP TABLE `weaponinstance`;

-- AddForeignKey
ALTER TABLE `EntityModifier` ADD CONSTRAINT `EntityModifier_creatureInstanceid_fkey` FOREIGN KEY (`creatureInstanceid`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Source` ADD CONSTRAINT `Source_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
