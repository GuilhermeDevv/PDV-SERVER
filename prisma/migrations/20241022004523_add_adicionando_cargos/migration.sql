/*
  Warnings:

  - You are about to drop the column `cargo` on the `Funcionario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Funcionario" DROP COLUMN "cargo",
ADD COLUMN     "cargoId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Cargo" (
    "id_cargo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel_acesso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id_cargo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_nome_key" ON "Cargo"("nome");

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id_cargo") ON DELETE RESTRICT ON UPDATE CASCADE;
