-- CreateTable
CREATE TABLE "IPAddress" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IPAddress_pkey" PRIMARY KEY ("id")
);
