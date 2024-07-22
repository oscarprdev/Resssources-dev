-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "profileImage" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "SocialMedia" (
    "userId" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
