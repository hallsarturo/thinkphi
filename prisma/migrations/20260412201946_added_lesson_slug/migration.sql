/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lesson_slug_key" ON "lesson"("slug");
