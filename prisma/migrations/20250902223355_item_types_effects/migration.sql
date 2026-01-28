/*
  Warnings:

  - The values [GEAR] on the enum `Item_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `type` ENUM('WEAPON', 'ARMOR', 'CONSUMABLE', 'TOOL', 'ARTIFACT', 'KEY_ITEM', 'COMPONENT', 'MATERIAL', 'MISC') NOT NULL;

-- AlterTable
ALTER TABLE `race` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `damage` VARCHAR(191) NULL,
    `range` VARCHAR(191) NULL,
    `rof` INTEGER NULL,
    `ap` INTEGER NULL,
    `caliber` DOUBLE NULL,
    `minStrength` VARCHAR(191) NULL,
    `special` TEXT NULL,

    UNIQUE INDEX `Weapon_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Armor` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `armorBonus` INTEGER NOT NULL,
    `covers` VARCHAR(191) NOT NULL,
    `minStrength` VARCHAR(191) NULL,
    `parryPenalty` INTEGER NULL,
    `special` TEXT NULL,

    UNIQUE INDEX `Armor_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Effect` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,

    UNIQUE INDEX `Effect_name_key`(`name`),
    UNIQUE INDEX `Effect_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponEffect` (
    `weaponId` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`weaponId`, `effectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArmorEffect` (
    `armorId` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`armorId`, `effectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consumable` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `effect` TEXT NOT NULL,
    `uses` INTEGER NULL,

    UNIQUE INDEX `Consumable_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tool` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `skillBonus` INTEGER NULL,
    `uses` INTEGER NULL,
    `durability` INTEGER NULL,
    `special` TEXT NULL,

    UNIQUE INDEX `Tool_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artifact` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `rarity` VARCHAR(191) NULL,
    `effect` TEXT NOT NULL,
    `charges` INTEGER NULL,
    `boundTo` VARCHAR(191) NULL,

    UNIQUE INDEX `Artifact_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MagicDevice` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `powerPoints` INTEGER NULL,
    `recharge` VARCHAR(191) NULL,
    `special` TEXT NULL,

    UNIQUE INDEX `MagicDevice_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spell` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `powerPointCost` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MagicDeviceSpell` (
    `magicDeviceId` VARCHAR(191) NOT NULL,
    `spellId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`magicDeviceId`, `spellId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Armor` ADD CONSTRAINT `Armor_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponEffect` ADD CONSTRAINT `WeaponEffect_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponEffect` ADD CONSTRAINT `WeaponEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArmorEffect` ADD CONSTRAINT `ArmorEffect_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `Armor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArmorEffect` ADD CONSTRAINT `ArmorEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumable` ADD CONSTRAINT `Consumable_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tool` ADD CONSTRAINT `Tool_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artifact` ADD CONSTRAINT `Artifact_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MagicDevice` ADD CONSTRAINT `MagicDevice_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MagicDeviceSpell` ADD CONSTRAINT `MagicDeviceSpell_magicDeviceId_fkey` FOREIGN KEY (`magicDeviceId`) REFERENCES `MagicDevice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MagicDeviceSpell` ADD CONSTRAINT `MagicDeviceSpell_spellId_fkey` FOREIGN KEY (`spellId`) REFERENCES `Spell`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
