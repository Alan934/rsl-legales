/*
  Warnings:

  - You are about to drop the column `roleId` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USUARIO', 'ADMIN');

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_roleId_fkey";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "roleId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USUARIO';

-- DropTable
DROP TABLE "roles";
