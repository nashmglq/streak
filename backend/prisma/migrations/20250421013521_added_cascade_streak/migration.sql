-- DropForeignKey
ALTER TABLE "streak" DROP CONSTRAINT "streak_userId_fkey";

-- AddForeignKey
ALTER TABLE "streak" ADD CONSTRAINT "streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
