/*
  Warnings:

  - You are about to drop the column `name` on the `tag` table. All the data in the column will be lost.
  - Added the required column `nameEng` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameVn` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tag` DROP COLUMN `name`,
    ADD COLUMN `nameEng` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameVn` VARCHAR(191) NOT NULL;
