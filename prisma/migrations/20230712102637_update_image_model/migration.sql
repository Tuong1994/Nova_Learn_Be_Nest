/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_courseId_key` ON `Image`(`courseId`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
