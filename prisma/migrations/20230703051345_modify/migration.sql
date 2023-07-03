/*
  Warnings:

  - You are about to drop the column `nameEng` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `nameVn` on the `tag` table. All the data in the column will be lost.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tag` DROP COLUMN `nameEng`,
    DROP COLUMN `nameVn`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
