-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
