/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Resources` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ResourcesCreated_resourceId_key";

-- DropIndex
DROP INDEX "ResourcesCreated_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Resources_id_key" ON "Resources"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");
