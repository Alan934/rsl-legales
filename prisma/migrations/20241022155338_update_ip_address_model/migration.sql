/*
  Warnings:

  - Added the required column `updatedAt` to the `IPAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IPAddress" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
