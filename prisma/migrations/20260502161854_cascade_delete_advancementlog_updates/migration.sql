/*
  Warnings:

  - You are about to drop the column `description` on the `advancementlog` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `advancementlog` table. All the data in the column will be lost.
  - You are about to drop the column `playerCharacterId` on the `advancementlog` table. All the data in the column will be lost.
  - You are about to drop the column `spentAt` on the `advancementlog` table. All the data in the column will be lost.
  - You are about to drop the column `modifierData` on the `ammunition` table. All the data in the column will be lost.
  - You are about to drop the column `modifierData` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `advancesSpent` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `playercharacter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `SpecialAbility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `advanceNumber` to the `AdvancementLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `AdvancementLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `AdvancementLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankAtTime` to the `AdvancementLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `SpecialAbility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `advancementlog` DROP FOREIGN KEY `AdvancementLog_playerCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `ammunition` DROP FOREIGN KEY `Ammunition_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacteredge` DROP FOREIGN KEY `PlayerCharacterEdge_playerCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterpower` DROP FOREIGN KEY `PlayerCharacterPower_playerCharacterId_fkey`;

-- DropIndex
DROP INDEX `AdvancementLog_playerCharacterId_fkey` ON `advancementlog`;

-- AlterTable
ALTER TABLE `advancementlog` DROP COLUMN `description`,
    DROP COLUMN `details`,
    DROP COLUMN `playerCharacterId`,
    DROP COLUMN `spentAt`,
    ADD COLUMN `advanceNumber` INTEGER NOT NULL,
    ADD COLUMN `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `characterId` VARCHAR(191) NOT NULL,
    ADD COLUMN `payload` JSON NOT NULL,
    ADD COLUMN `rankAtTime` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL;

-- AlterTable
ALTER TABLE `ammunition` DROP COLUMN `modifierData`;

-- AlterTable
ALTER TABLE `arcanebackground` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `armor` DROP COLUMN `modifierData`;

-- AlterTable
ALTER TABLE `creature` ADD COLUMN `iconUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `edge` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `hindrance` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `modifierData` JSON NULL;

-- AlterTable
ALTER TABLE `iteminstance` MODIFY `state` JSON NULL;

-- AlterTable
ALTER TABLE `playercharacter` DROP COLUMN `advancesSpent`,
    DROP COLUMN `experience`,
    ADD COLUMN `advancementsEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `advancesEarned` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `advancesPerRank` INTEGER NOT NULL DEFAULT 4;

-- AlterTable
ALTER TABLE `power` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `race` ADD COLUMN `iconUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `specialability` ADD COLUMN `iconUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SpecialAbility_slug_key` ON `SpecialAbility`(`slug`);

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvancementLog` ADD CONSTRAINT `AdvancementLog_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ammunition` ADD CONSTRAINT `Ammunition_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
