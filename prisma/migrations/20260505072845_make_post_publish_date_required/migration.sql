/*
  Warnings:

  - Made the column `publishDate` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "publishDate" SET NOT NULL;
