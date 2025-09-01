/*
  Warnings:

  - You are about to drop the column `advances` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `modifier` on the `playercharacterskill` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `playercharacterskill` table. All the data in the column will be lost.
  - You are about to drop the column `bonusAmount` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the column `raceId` on the `racialability` table. All the data in the column will be lost.
  - You are about to drop the column `campaignPlayerCharacterId` on the `sessioncharacterstate` table. All the data in the column will be lost.
  - You are about to drop the `campaignplayercharacter` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `wealth` on table `playercharacter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `campaignplayercharacter` DROP FOREIGN KEY `CampaignPlayerCharacter_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignplayercharacter` DROP FOREIGN KEY `CampaignPlayerCharacter_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `racialability` DROP FOREIGN KEY `RacialAbility_raceId_fkey`;

-- DropForeignKey
ALTER TABLE `sessioncharacterstate` DROP FOREIGN KEY `SessionCharacterState_campaignPlayerCharacterId_fkey`;

-- DropIndex
DROP INDEX `RacialAbility_raceId_idx` ON `racialability`;

-- DropIndex
DROP INDEX `SessionCharacterState_campaignPlayerCharacterId_fkey` ON `sessioncharacterstate`;

-- AlterTable
ALTER TABLE `playercharacter` DROP COLUMN `advances`,
    DROP COLUMN `notes`,
    ADD COLUMN `advancesSpent` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `advancesUnspent` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `bennies` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `campaignId` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `fatigue` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `wounds` INTEGER NOT NULL DEFAULT 0,
    MODIFY `wealth` INTEGER NOT NULL DEFAULT 500;

-- AlterTable
ALTER TABLE `playercharacteritem` ADD COLUMN `isEquipped` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `playercharacterskill` DROP COLUMN `modifier`,
    DROP COLUMN `notes`;

-- AlterTable
ALTER TABLE `racialability` DROP COLUMN `bonusAmount`,
    DROP COLUMN `raceId`;

-- AlterTable
ALTER TABLE `sessioncharacterstate` DROP COLUMN `campaignPlayerCharacterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `campaignplayercharacter`;

-- CreateTable
CREATE TABLE `AdvancementLog` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `spentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RaceToRacialAbility` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RaceToRacialAbility_AB_unique`(`A`, `B`),
    INDEX `_RaceToRacialAbility_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvancementLog` ADD CONSTRAINT `AdvancementLog_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RaceToRacialAbility` ADD CONSTRAINT `_RaceToRacialAbility_A_fkey` FOREIGN KEY (`A`) REFERENCES `Race`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RaceToRacialAbility` ADD CONSTRAINT `_RaceToRacialAbility_B_fkey` FOREIGN KEY (`B`) REFERENCES `RacialAbility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
