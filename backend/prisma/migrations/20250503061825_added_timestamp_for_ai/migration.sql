/*
  Warnings:

  - Added the required column `dateReturn` to the `aiResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aiResponse" ADD COLUMN     "dateReturn" TIMESTAMP(3) NOT NULL;
