-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
