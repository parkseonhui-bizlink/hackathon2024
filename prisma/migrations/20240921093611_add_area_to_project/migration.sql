/*
  Warnings:

  - You are about to drop the column `Category` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `Skill` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "Category",
DROP COLUMN "Skill",
ADD COLUMN     "areas" TEXT[],
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "skills" TEXT[];
