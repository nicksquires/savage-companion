/*
  Warnings:

  - You are about to drop the column `content` on the `gmjournalentry` table. All the data in the column will be lost.
  - You are about to drop the column `arcaneBackground` on the `playercharacter` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `playerjournalentry` table. All the data in the column will be lost.
  - You are about to alter the column `linkedAttribute` on the `skill` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(17))`.
  - Added the required column `body` to the `GMJournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `PlayerJournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gmjournalentry` DROP COLUMN `content`,
    ADD COLUMN `body` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playercharacter` DROP COLUMN `arcaneBackground`;

-- AlterTable
ALTER TABLE `playerjournalentry` DROP COLUMN `content`,
    ADD COLUMN `body` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `sourceId` VARCHAR(191) NULL,
    MODIFY `linkedAttribute` ENUM('AGILITY', 'SMARTS', 'SPIRIT', 'STRENGTH', 'VIGOR') NOT NULL,
    MODIFY `isPublic` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `ArcaneBackground` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `arcaneSkillId` VARCHAR(191) NOT NULL,
    `startingPowers` INTEGER NOT NULL,
    `powerPoints` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ArcaneBackground_name_key`(`name`),
    INDEX `ArcaneBackground_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterArcaneBackground` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `arcaneBackgroundId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `PlayerCharacterArcaneBackground_playerCharacterId_arcaneBack_key`(`playerCharacterId`, `arcaneBackgroundId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_arcaneSkillId_fkey` FOREIGN KEY (`arcaneSkillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_arcaneBackgroundId_fkey` FOREIGN KEY (`arcaneBackgroundId`) REFERENCES `ArcaneBackground`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
