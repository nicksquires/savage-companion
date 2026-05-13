/*
  Warnings:

  - You are about to drop the `advancementlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `advancementlog` DROP FOREIGN KEY `AdvancementLog_characterId_fkey`;

-- DropTable
DROP TABLE `advancementlog`;

-- CreateTable
CREATE TABLE `Advance` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `advanceNumber` INTEGER NOT NULL,
    `rankAtTime` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `payload` JSON NULL,
    `appliedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Advance` ADD CONSTRAINT `Advance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
