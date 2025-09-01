-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('free', 'basic', 'premium', 'admin') NOT NULL DEFAULT 'free';
