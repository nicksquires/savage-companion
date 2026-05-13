/*
  Warnings:

  - You are about to drop the column `arcaneSkillId` on the `arcanebackground` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ArcaneBackground` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arcaneSkillSlug` to the `ArcaneBackground` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ArcaneBackground` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `arcanebackground` DROP FOREIGN KEY `ArcaneBackground_arcaneSkillId_fkey`;

-- DropIndex
DROP INDEX `ArcaneBackground_arcaneSkillId_fkey` ON `arcanebackground`;

-- AlterTable
ALTER TABLE `arcanebackground` DROP COLUMN `arcaneSkillId`,
    ADD COLUMN `arcaneSkillSlug` VARCHAR(191) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ArcaneBackground_slug_key` ON `ArcaneBackground`(`slug`);

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_arcaneSkillSlug_fkey` FOREIGN KEY (`arcaneSkillSlug`) REFERENCES `Skill`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;
