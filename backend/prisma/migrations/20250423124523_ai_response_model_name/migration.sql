/*
  Warnings:

  - You are about to drop the `ai_response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ai_response" DROP CONSTRAINT "ai_response_streakId_fkey";

-- DropTable
DROP TABLE "ai_response";

-- CreateTable
CREATE TABLE "aiResponse" (
    "responseId" SERIAL NOT NULL,
    "response" VARCHAR(999) NOT NULL,
    "streakId" INTEGER NOT NULL,

    CONSTRAINT "aiResponse_pkey" PRIMARY KEY ("responseId")
);

-- AddForeignKey
ALTER TABLE "aiResponse" ADD CONSTRAINT "aiResponse_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "streak"("streakId") ON DELETE CASCADE ON UPDATE CASCADE;
