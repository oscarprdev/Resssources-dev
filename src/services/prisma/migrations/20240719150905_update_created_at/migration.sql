/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Resources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resources_createdAt_key" ON "Resources"("createdAt");
