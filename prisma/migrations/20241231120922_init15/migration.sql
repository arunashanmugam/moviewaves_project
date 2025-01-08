/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `role`;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_email_key` ON `Admin`(`email`);
