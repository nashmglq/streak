-- CreateTable
CREATE TABLE "ai_response" (
    "responseId" SERIAL NOT NULL,
    "response" VARCHAR(999) NOT NULL,
    "streakId" INTEGER NOT NULL,

    CONSTRAINT "ai_response_pkey" PRIMARY KEY ("responseId")
);

-- AddForeignKey
ALTER TABLE "ai_response" ADD CONSTRAINT "ai_response_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "streak"("streakId") ON DELETE CASCADE ON UPDATE CASCADE;
