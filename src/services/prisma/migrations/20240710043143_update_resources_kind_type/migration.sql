/*
  Warnings:

  - Changed the column `kind` on the `Resources` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Resources"
  ALTER COLUMN "kind" TYPE "Kind"[]
  USING ARRAY["kind"::"Kind"];