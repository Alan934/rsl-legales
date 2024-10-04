/*
  Warnings:

  - Changed the type of `servicioRequerido` on the `Formulario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServicioRequerido" AS ENUM ('CERTIFICACIONES', 'OP_INMOBILIARIAS', 'CONTRATOS_PRIVADOS');

-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "servicioRequerido",
ADD COLUMN     "servicioRequerido" "ServicioRequerido" NOT NULL;
