-- DropIndex
DROP INDEX `Admin_email_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `role` VARCHAR(191) NULL;
