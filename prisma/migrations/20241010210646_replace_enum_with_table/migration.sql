/*
  Warnings:

  - You are about to drop the column `servicioRequerido` on the `Formulario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Formulario" DROP COLUMN "servicioRequerido",
ADD COLUMN     "servicioId" INTEGER;

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombreServicio" TEXT NOT NULL,
    "valorServicio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Formulario" ADD CONSTRAINT "Formulario_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
