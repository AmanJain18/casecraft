/*
  Warnings:

  - Added the required column `originalImageUrl` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "originalImageUrl" TEXT NOT NULL;
