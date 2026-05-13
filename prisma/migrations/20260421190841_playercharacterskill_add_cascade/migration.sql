-- DropForeignKey
ALTER TABLE `playercharacterskill` DROP FOREIGN KEY `PlayerCharacterSkill_playerCharacterId_fkey`;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
