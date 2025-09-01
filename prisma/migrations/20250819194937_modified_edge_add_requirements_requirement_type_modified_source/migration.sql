/*
  Warnings:

  - You are about to drop the column `requirements` on the `edge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `edge` DROP COLUMN `requirements`;

-- AlterTable
ALTER TABLE `source` MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edgeId` VARCHAR(191) NOT NULL,
    `type` ENUM('ATTRIBUTE', 'SKILL', 'EDGE') NOT NULL,
    `attribute` ENUM('AGILITY', 'SMARTS', 'SPIRIT', 'STRENGTH', 'VIGOR') NULL,
    `skill` VARCHAR(191) NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NULL,
    `edgeReqId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_edgeReqId_fkey` FOREIGN KEY (`edgeReqId`) REFERENCES `Edge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
