/*
  Warnings:

  - Made the column `slug` on table `lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "slug" SET NOT NULL;
