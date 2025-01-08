/*
  Warnings:

  - You are about to drop the `_moviegenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviegenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_moviegenres` DROP FOREIGN KEY `_MovieGenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_moviegenres` DROP FOREIGN KEY `_MovieGenres_B_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_movieId_fkey`;

-- DropTable
DROP TABLE `_moviegenres`;

-- DropTable
DROP TABLE `genre`;

-- DropTable
DROP TABLE `moviegenre`;
