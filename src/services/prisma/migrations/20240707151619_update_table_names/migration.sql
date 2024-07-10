/*
  Warnings:

  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceCreated` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavouriteResource" DROP CONSTRAINT "FavouriteResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteResource" DROP CONSTRAINT "FavouriteResource_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceCreated" DROP CONSTRAINT "ResourceCreated_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceCreated" DROP CONSTRAINT "ResourceCreated_userId_fkey";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "ResourceCreated";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Resources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "faviconUrl" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" "Kind" NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourcesCreated" (
    "userId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourcesCreated_pkey" PRIMARY KEY ("userId","resourceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resources_title_key" ON "Resources"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Resources_resourceUrl_key" ON "Resources"("resourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "FavouriteResource" ADD CONSTRAINT "FavouriteResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteResource" ADD CONSTRAINT "FavouriteResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesCreated" ADD CONSTRAINT "ResourcesCreated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesCreated" ADD CONSTRAINT "ResourcesCreated_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
