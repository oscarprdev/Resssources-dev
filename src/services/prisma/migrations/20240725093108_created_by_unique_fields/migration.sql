/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ResourcesCreated` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resourceId]` on the table `ResourcesCreated` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResourcesCreated_userId_key" ON "ResourcesCreated"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourcesCreated_resourceId_key" ON "ResourcesCreated"("resourceId");
