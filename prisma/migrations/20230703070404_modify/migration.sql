/*
  Warnings:

  - Added the required column `note` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `content` VARCHAR(3000) NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `commentText` VARCHAR(2500) NOT NULL;

-- AlterTable
ALTER TABLE `course` MODIFY `descriptEng` VARCHAR(2500) NOT NULL,
    MODIFY `descriptVn` VARCHAR(2500) NOT NULL,
    MODIFY `projectInfoEng` VARCHAR(2500) NULL,
    MODIFY `projectInfoVn` VARCHAR(2500) NULL;

-- AlterTable
ALTER TABLE `courseoutput` MODIFY `contentEng` VARCHAR(2500) NOT NULL,
    MODIFY `contentVn` VARCHAR(2500) NOT NULL;

-- AlterTable
ALTER TABLE `courseproject` MODIFY `descriptEng` VARCHAR(2500) NOT NULL,
    MODIFY `descriptVn` VARCHAR(2500) NOT NULL;

-- AlterTable
ALTER TABLE `rate` ADD COLUMN `note` VARCHAR(2500) NOT NULL;

-- AlterTable
ALTER TABLE `tasktodo` MODIFY `contentEng` VARCHAR(2500) NOT NULL,
    MODIFY `contentVn` VARCHAR(2500) NOT NULL;
