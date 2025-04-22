/*
  Warnings:

  - Added the required column `endOfTime` to the `streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streak" ADD COLUMN     "endOfTime" TIMESTAMP(3) NOT NULL;
