/*
  Warnings:

  - You are about to drop the column `parentId` on the `hindrance` table. All the data in the column will be lost.
  - You are about to drop the column `effect` on the `power` table. All the data in the column will be lost.
  - Added the required column `description` to the `Power` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arcanebackground` ADD COLUMN `summary` TEXT NULL;

-- AlterTable
ALTER TABLE `edge` ADD COLUMN `summary` TEXT NULL;

-- AlterTable
ALTER TABLE `hindrance` DROP COLUMN `parentId`,
    ADD COLUMN `summary` TEXT NULL;

-- AlterTable
ALTER TABLE `power` DROP COLUMN `effect`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `summary` TEXT NULL,
    ADD COLUMN `trappings` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `specialability` ADD COLUMN `summary` TEXT NULL;
