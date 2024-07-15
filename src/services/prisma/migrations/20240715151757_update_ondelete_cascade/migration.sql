-- DropForeignKey
ALTER TABLE "FavouriteResource" DROP CONSTRAINT "FavouriteResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteResource" DROP CONSTRAINT "FavouriteResource_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResourcesCreated" DROP CONSTRAINT "ResourcesCreated_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourcesCreated" DROP CONSTRAINT "ResourcesCreated_userId_fkey";

-- AddForeignKey
ALTER TABLE "FavouriteResource" ADD CONSTRAINT "FavouriteResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteResource" ADD CONSTRAINT "FavouriteResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesCreated" ADD CONSTRAINT "ResourcesCreated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesCreated" ADD CONSTRAINT "ResourcesCreated_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
