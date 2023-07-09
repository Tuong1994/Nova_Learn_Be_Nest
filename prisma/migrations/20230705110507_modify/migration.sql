/*
  Warnings:

  - You are about to drop the `_courseprojecttotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_coursetopictotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_coursetostudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_coursetotag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_courseprojecttotag` DROP FOREIGN KEY `_CourseProjectToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_courseprojecttotag` DROP FOREIGN KEY `_CourseProjectToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetopictotag` DROP FOREIGN KEY `_CourseTopicToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetopictotag` DROP FOREIGN KEY `_CourseTopicToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetostudent` DROP FOREIGN KEY `_CourseToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetostudent` DROP FOREIGN KEY `_CourseToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetotag` DROP FOREIGN KEY `_CourseToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_coursetotag` DROP FOREIGN KEY `_CourseToTag_B_fkey`;

-- DropTable
DROP TABLE `_courseprojecttotag`;

-- DropTable
DROP TABLE `_coursetopictotag`;

-- DropTable
DROP TABLE `_coursetostudent`;

-- DropTable
DROP TABLE `_coursetotag`;
