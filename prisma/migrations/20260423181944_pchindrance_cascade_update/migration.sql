-- DropForeignKey
ALTER TABLE `campaigngm` DROP FOREIGN KEY `CampaignGM_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignsession` DROP FOREIGN KEY `CampaignSession_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `campaignsource` DROP FOREIGN KEY `CampaignSource_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `creatureability` DROP FOREIGN KEY `CreatureAbility_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `creatureedge` DROP FOREIGN KEY `CreatureEdge_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `creaturehindrance` DROP FOREIGN KEY `CreatureHindrance_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `creaturepower` DROP FOREIGN KEY `CreaturePower_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `creatureskill` DROP FOREIGN KEY `CreatureSkill_creatureId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterarcanebackground` DROP FOREIGN KEY `PlayerCharacterArcaneBackground_playerCharacterId_fkey`;

-- DropForeignKey
ALTER TABLE `playercharacterhindrance` DROP FOREIGN KEY `PlayerCharacterHindrance_playerCharacterId_fkey`;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureAbility` ADD CONSTRAINT `CreatureAbility_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureEdge` ADD CONSTRAINT `CreatureEdge_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreaturePower` ADD CONSTRAINT `CreaturePower_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureSkill` ADD CONSTRAINT `CreatureSkill_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureHindrance` ADD CONSTRAINT `CreatureHindrance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignGM` ADD CONSTRAINT `CampaignGM_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSession` ADD CONSTRAINT `CampaignSession_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
