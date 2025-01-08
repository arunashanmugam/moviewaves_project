-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_languageId_fkey`;

-- AlterTable
ALTER TABLE `movie` MODIFY `languageId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
