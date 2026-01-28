/*
  Warnings:

  - You are about to drop the column `currentAmmo` on the `firearm` table. All the data in the column will be lost.
  - You are about to drop the column `special` on the `weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `weapon` DROP FOREIGN KEY `Weapon_effectId_fkey`;

-- AlterTable
ALTER TABLE `firearm` DROP COLUMN `currentAmmo`;

-- AlterTable
ALTER TABLE `item` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `special`;

-- CreateTable
CREATE TABLE `ItemInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NULL,
    `characterId` VARCHAR(191) NULL,
    `creatureId` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `notes` VARCHAR(191) NULL,

    INDEX `ItemInstance_itemId_campaignId_idx`(`itemId`, `campaignId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemInstanceId` VARCHAR(191) NOT NULL,
    `isBroken` BOOLEAN NOT NULL DEFAULT false,
    `isJammed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `WeaponInstance_itemInstanceId_key`(`itemInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FirearmInstance` (
    `id` VARCHAR(191) NOT NULL,
    `weaponInstanceId` VARCHAR(191) NOT NULL,
    `currentAmmo` INTEGER NOT NULL,
    `chamberLoaded` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `FirearmInstance_weaponInstanceId_key`(`weaponInstanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponInstance` ADD CONSTRAINT `WeaponInstance_itemInstanceId_fkey` FOREIGN KEY (`itemInstanceId`) REFERENCES `ItemInstance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FirearmInstance` ADD CONSTRAINT `FirearmInstance_weaponInstanceId_fkey` FOREIGN KEY (`weaponInstanceId`) REFERENCES `WeaponInstance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
