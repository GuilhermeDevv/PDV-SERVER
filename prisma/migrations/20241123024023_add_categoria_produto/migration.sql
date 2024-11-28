/*
  Warnings:

  - Added the required column `categoriaId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corCategoria` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconeCategoria` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "corCategoria" TEXT NOT NULL,
ADD COLUMN     "fornecedor" TEXT DEFAULT 'SEM INFORMAÇÃO',
ADD COLUMN     "iconeCategoria" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CategoriaProduto" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriaProduto_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaProduto_nome_key" ON "CategoriaProduto"("nome");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaProduto"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
