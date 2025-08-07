/*
  Warnings:

  - You are about to drop the column `characterId` on the `playercharacteredge` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `playercharacterhindrance` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `playercharacteritem` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `playercharacterpower` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `playercharacterskill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerCharacterId,edgeId]` on the table `PlayerCharacterEdge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerCharacterId,hindranceId]` on the table `PlayerCharacterHindrance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerCharacterId,itemId]` on the table `PlayerCharacterItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerCharacterId,powerId]` on the table `PlayerCharacterPower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerCharacterId,skillId]` on the table `PlayerCharacterSkill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerCharacterId` to the `PlayerCharacterEdge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCharacterId` to the `PlayerCharacterHindrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCharacterId` to the `PlayerCharacterItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCharacterId` to the `PlayerCharacterPower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCharacterId` to the `PlayerCharacterSkill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `playercharacteredge` DROP FOREIGN KEY `PlayerCharacterEdge_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterhindrance` DROP FOREIGN KEY `PlayerCharacterHindrance_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacteritem` DROP FOREIGN KEY `PlayerCharacterItem_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterpower` DROP FOREIGN KEY `PlayerCharacterPower_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterskill` DROP FOREIGN KEY `PlayerCharacterSkill_characterId_fkey`;

-- DropIndex
DROP INDEX `PlayerCharacterEdge_characterId_edgeId_key` ON `playercharacteredge`;

-- DropIndex
DROP INDEX `PlayerCharacterHindrance_characterId_hindranceId_key` ON `playercharacterhindrance`;

-- DropIndex
DROP INDEX `PlayerCharacterItem_characterId_itemId_key` ON `playercharacteritem`;

-- DropIndex
DROP INDEX `PlayerCharacterPower_characterId_powerId_key` ON `playercharacterpower`;

-- DropIndex
DROP INDEX `PlayerCharacterSkill_characterId_skillId_key` ON `playercharacterskill`;

-- AlterTable
ALTER TABLE `playercharacteredge` DROP COLUMN `characterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playercharacterhindrance` DROP COLUMN `characterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playercharacteritem` DROP COLUMN `characterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playercharacterpower` DROP COLUMN `characterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `playercharacterskill` DROP COLUMN `characterId`,
    ADD COLUMN `playerCharacterId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PlayerCharacterEdge_playerCharacterId_edgeId_key` ON `PlayerCharacterEdge`(`playerCharacterId`, `edgeId`);

-- CreateIndex
CREATE UNIQUE INDEX `PlayerCharacterHindrance_playerCharacterId_hindranceId_key` ON `PlayerCharacterHindrance`(`playerCharacterId`, `hindranceId`);

-- CreateIndex
CREATE UNIQUE INDEX `PlayerCharacterItem_playerCharacterId_itemId_key` ON `PlayerCharacterItem`(`playerCharacterId`, `itemId`);

-- CreateIndex
CREATE UNIQUE INDEX `PlayerCharacterPower_playerCharacterId_powerId_key` ON `PlayerCharacterPower`(`playerCharacterId`, `powerId`);

-- CreateIndex
CREATE UNIQUE INDEX `PlayerCharacterSkill_playerCharacterId_skillId_key` ON `PlayerCharacterSkill`(`playerCharacterId`, `skillId`);

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterItem` ADD CONSTRAINT `PlayerCharacterItem_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
