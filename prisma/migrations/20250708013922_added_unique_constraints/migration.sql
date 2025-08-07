/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Edge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Hindrance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Power` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SpecialAbility` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `specialability` MODIFY `parameters` JSON NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Edge_name_key` ON `Edge`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Hindrance_name_key` ON `Hindrance`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Item_name_key` ON `Item`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Power_name_key` ON `Power`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `SpecialAbility_name_key` ON `SpecialAbility`(`name`);
