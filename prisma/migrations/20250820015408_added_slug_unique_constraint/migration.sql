/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Edge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `edge` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Edge_slug_key` ON `Edge`(`slug`);
