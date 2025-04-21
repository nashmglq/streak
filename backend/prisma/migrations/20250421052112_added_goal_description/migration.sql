/*
  Warnings:

  - Added the required column `goal` to the `streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streak" ADD COLUMN     "goal" VARCHAR(999) NOT NULL;
