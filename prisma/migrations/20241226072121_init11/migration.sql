/*
  Warnings:

  - You are about to drop the column `regionId` on the `language` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `language` DROP FOREIGN KEY `Language_regionId_fkey`;

-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_regionId_fkey`;

-- AlterTable
ALTER TABLE `language` DROP COLUMN `regionId`;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `regionId`;

-- DropTable
DROP TABLE `region`;
