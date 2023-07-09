/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Auth_token_key` ON `Auth`(`token`);
