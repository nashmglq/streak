-- CreateTable
CREATE TABLE "streak" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(999) NOT NULL,
    "days" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "streak_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "streak" ADD CONSTRAINT "streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
