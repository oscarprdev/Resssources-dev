-- AlterEnum
ALTER TYPE "Kind" ADD VALUE 'AI';

-- AlterTable
ALTER TABLE "Resources" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
