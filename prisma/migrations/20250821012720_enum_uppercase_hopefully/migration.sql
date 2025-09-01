/*
  Warnings:

  - You are about to alter the column `dieType` on the `campaignitem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `Enum(EnumId(33))`.
  - You are about to alter the column `agility` on the `creature` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `Enum(EnumId(33))`.
  - You are about to alter the column `smarts` on the `creature` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(14))` to `Enum(EnumId(33))`.
  - You are about to alter the column `spirit` on the `creature` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(16))` to `Enum(EnumId(33))`.
  - You are about to alter the column `strength` on the `creature` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(21))` to `Enum(EnumId(33))`.
  - You are about to alter the column `vigor` on the `creature` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(22))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `creatureitem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `creatureskill` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `Enum(EnumId(33))`.
  - You are about to alter the column `rank` on the `edge` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(10))` to `Enum(EnumId(18))`.
  - The values [Minor,Major] on the enum `Hindrance_severity` will be removed. If these variants are still used in the database, this will fail.
  - The values [Weapon,Armor,Gear,Consumable,Tool,Misc] on the enum `Item_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [Novice,Seasoned,Veteran,Heroic,Legendary] on the enum `Power_rank` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `agility` on the `playercharacter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(24))` to `Enum(EnumId(33))`.
  - You are about to alter the column `smarts` on the `playercharacter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(26))` to `Enum(EnumId(33))`.
  - You are about to alter the column `spirit` on the `playercharacter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(28))` to `Enum(EnumId(33))`.
  - You are about to alter the column `strength` on the `playercharacter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(30))` to `Enum(EnumId(33))`.
  - You are about to alter the column `vigor` on the `playercharacter` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(32))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `playercharacteritem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `playercharacterskill` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(33))`.
  - You are about to alter the column `rank` on the `power` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(18))`.
  - The values [d4,d6,d8,d10,d12,d20,d30,d50,d100] on the enum `CreatureItem_dieType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `type` on the `sessionevent` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(15))` to `Enum(EnumId(1))`.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(23))` to `Enum(EnumId(0))`.
  - The values [Novice,Seasoned,Veteran,Heroic,Legendary] on the enum `Power_rank` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `agility` on the `wildcard` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(25))` to `Enum(EnumId(33))`.
  - You are about to alter the column `smarts` on the `wildcard` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(27))` to `Enum(EnumId(33))`.
  - You are about to alter the column `spirit` on the `wildcard` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(29))` to `Enum(EnumId(33))`.
  - You are about to alter the column `strength` on the `wildcard` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(31))` to `Enum(EnumId(33))`.
  - You are about to alter the column `vigor` on the `wildcard` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(33))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `wildcarditem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(12))` to `Enum(EnumId(33))`.
  - You are about to alter the column `dieType` on the `wildcardskill` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(13))` to `Enum(EnumId(33))`.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `campaignitem` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `creature` MODIFY `agility` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `smarts` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `spirit` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `strength` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `vigor` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `creatureitem` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `creatureskill` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `edge` MODIFY `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE';

-- AlterTable
ALTER TABLE `hindrance` MODIFY `severity` ENUM('MINOR', 'MAJOR') NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `type` ENUM('WEAPON', 'ARMOR', 'GEAR', 'CONSUMABLE', 'TOOL', 'MISC') NOT NULL;

-- AlterTable
ALTER TABLE `playercharacter` MODIFY `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL,
    MODIFY `agility` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `smarts` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `spirit` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `strength` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `vigor` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `playercharacteritem` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `playercharacterskill` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `power` MODIFY `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE';

-- AlterTable
ALTER TABLE `requirement` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NULL;

-- AlterTable
ALTER TABLE `sessionevent` MODIFY `type` ENUM('NARRATIVE', 'COMBAT', 'EXPLORATION', 'PUZZLE', 'SOCIAL', 'TRAVEL') NOT NULL DEFAULT 'NARRATIVE';

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('FREE', 'BASIC', 'PREMIUM', 'ADMIN') NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE `wildcard` MODIFY `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL,
    MODIFY `agility` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `smarts` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `spirit` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `strength` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    MODIFY `vigor` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `wildcarditem` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';

-- AlterTable
ALTER TABLE `wildcardskill` MODIFY `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4';
