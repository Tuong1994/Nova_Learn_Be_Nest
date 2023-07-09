/*
  Warnings:

  - Added the required column `updatedAt` to the `CoursesOnTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectsOnTags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentsOnCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TopicsOnTags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coursesontags` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `projectsontags` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `studentsoncourses` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `topicsontags` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
