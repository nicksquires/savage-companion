/*
  Warnings:

  - You are about to drop the column `sourceId` on the `arcanebackground` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `campaignsource` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `creature` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `edge` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `hindrance` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `power` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `race` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `specialability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[campaignId,sourceName]` on the table `CampaignSource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceName` to the `CampaignSource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `arcanebackground` DROP FOREIGN KEY `ArcaneBackground_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignsource` DROP FOREIGN KEY `CampaignSource_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignsource` DROP FOREIGN KEY `CampaignSource_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `creature` DROP FOREIGN KEY `Creature_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `edge` DROP FOREIGN KEY `Edge_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `hindrance` DROP FOREIGN KEY `Hindrance_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `power` DROP FOREIGN KEY `Power_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `race` DROP FOREIGN KEY `Race_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `Skill_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `specialability` DROP FOREIGN KEY `SpecialAbility_sourceId_fkey`;

-- DropIndex
DROP INDEX `ArcaneBackground_name_sourceId_idx` ON `arcanebackground`;

-- DropIndex
DROP INDEX `ArcaneBackground_sourceId_fkey` ON `arcanebackground`;

-- DropIndex
DROP INDEX `CampaignSource_campaignId_sourceId_key` ON `campaignsource`;

-- DropIndex
DROP INDEX `CampaignSource_sourceId_fkey` ON `campaignsource`;

-- DropIndex
DROP INDEX `Creature_name_ownerId_sourceId_idx` ON `creature`;

-- DropIndex
DROP INDEX `Creature_sourceId_fkey` ON `creature`;

-- DropIndex
DROP INDEX `Edge_name_rank_category_sourceId_idx` ON `edge`;

-- DropIndex
DROP INDEX `Edge_sourceId_fkey` ON `edge`;

-- DropIndex
DROP INDEX `Hindrance_name_severity_sourceId_idx` ON `hindrance`;

-- DropIndex
DROP INDEX `Hindrance_sourceId_fkey` ON `hindrance`;

-- DropIndex
DROP INDEX `Item_name_type_sourceId_idx` ON `item`;

-- DropIndex
DROP INDEX `Item_sourceId_fkey` ON `item`;

-- DropIndex
DROP INDEX `Power_name_rank_sourceId_idx` ON `power`;

-- DropIndex
DROP INDEX `Power_sourceId_fkey` ON `power`;

-- DropIndex
DROP INDEX `Race_name_sourceId_ownerId_idx` ON `race`;

-- DropIndex
DROP INDEX `Race_sourceId_fkey` ON `race`;

-- DropIndex
DROP INDEX `Skill_name_sourceId_ownerId_idx` ON `skill`;

-- DropIndex
DROP INDEX `Skill_sourceId_fkey` ON `skill`;

-- DropIndex
DROP INDEX `SpecialAbility_sourceId_fkey` ON `specialability`;

-- AlterTable
ALTER TABLE `arcanebackground` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `campaignsource` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `creature` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `edge` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `hindrance` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `power` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `race` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `specialability` DROP COLUMN `sourceId`,
    ADD COLUMN `sourceName` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `ArcaneBackground_name_sourceName_idx` ON `ArcaneBackground`(`name`, `sourceName`);

-- CreateIndex
CREATE UNIQUE INDEX `CampaignSource_campaignId_sourceName_key` ON `CampaignSource`(`campaignId`, `sourceName`);

-- CreateIndex
CREATE INDEX `Creature_name_ownerId_sourceName_idx` ON `Creature`(`name`, `ownerId`, `sourceName`);

-- CreateIndex
CREATE INDEX `Edge_name_rank_category_sourceName_idx` ON `Edge`(`name`, `rank`, `category`, `sourceName`);

-- CreateIndex
CREATE INDEX `Hindrance_name_severity_sourceName_idx` ON `Hindrance`(`name`, `severity`, `sourceName`);

-- CreateIndex
CREATE INDEX `Item_name_type_sourceName_idx` ON `Item`(`name`, `type`, `sourceName`);

-- CreateIndex
CREATE INDEX `Power_name_rank_sourceName_idx` ON `Power`(`name`, `rank`, `sourceName`);

-- CreateIndex
CREATE INDEX `Race_name_sourceName_ownerId_idx` ON `Race`(`name`, `sourceName`, `ownerId`);

-- CreateIndex
CREATE INDEX `Skill_name_sourceName_ownerId_idx` ON `Skill`(`name`, `sourceName`, `ownerId`);

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Power` ADD CONSTRAINT `Power_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbility` ADD CONSTRAINT `SpecialAbility_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hindrance` ADD CONSTRAINT `Hindrance_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
