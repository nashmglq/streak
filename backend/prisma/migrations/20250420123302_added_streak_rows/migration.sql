/*
  Warnings:

  - The primary key for the `streak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `days` on the `streak` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `streak` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `streak` table. All the data in the column will be lost.
  - Added the required column `highestStreak` to the `streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastActionTime` to the `streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streakName` to the `streak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streakStarted` to the `streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "streak" DROP CONSTRAINT "streak_pkey",
DROP COLUMN "days",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highestStreak" INTEGER NOT NULL,
ADD COLUMN     "lastActionTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "streakId" SERIAL NOT NULL,
ADD COLUMN     "streakName" VARCHAR(999) NOT NULL,
ADD COLUMN     "streakStarted" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "streak_pkey" PRIMARY KEY ("streakId");
