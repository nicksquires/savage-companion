/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Hindrance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Power` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `RacialAbility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Hindrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Power` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `RacialAbility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hindrance` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- Warning fix
UPDATE hindrance SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL OR slug = '';

-- AlterTable
ALTER TABLE `power` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- Warning fix
UPDATE power SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL OR slug = '';

-- AlterTable
ALTER TABLE `racialability` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Hindrance_slug_key` ON `Hindrance`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Power_slug_key` ON `Power`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `RacialAbility_slug_key` ON `RacialAbility`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Skill_slug_key` ON `Skill`(`slug`);