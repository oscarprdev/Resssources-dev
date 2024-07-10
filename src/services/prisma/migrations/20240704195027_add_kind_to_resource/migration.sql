/*
  Warnings:

  - Added the required column `kind` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Kind" AS ENUM ('FRONTEND', 'BACKEND', 'UI', 'DATABASES', 'STYLES', 'ALGORITHMS', 'ARCHITECTURE', 'TOOLS', 'FRAMEWORKS', 'TESTING', 'DEVOPS', 'SECURITY');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "kind" "Kind" NOT NULL;
