/*
  Warnings:

  - You are about to drop the column `fullAddress` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `fullAddress`,
    ADD COLUMN `fullAddressEng` VARCHAR(191) NULL,
    ADD COLUMN `fullAddressVn` VARCHAR(191) NULL;
