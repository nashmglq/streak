/*
  Warnings:

  - Added the required column `coolDownTimer` to the `streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streak" ADD COLUMN     "coolDown" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coolDownTimer" TIMESTAMP(3) NOT NULL;
