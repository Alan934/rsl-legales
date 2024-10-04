-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "servicioRequerido" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);
