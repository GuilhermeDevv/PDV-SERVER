/*
  Warnings:

  - You are about to drop the column `corCategoria` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `iconeCategoria` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `corCategoria` to the `CategoriaProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconeCategoria` to the `CategoriaProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoriaProduto" ADD COLUMN     "corCategoria" TEXT NOT NULL,
ADD COLUMN     "iconeCategoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "corCategoria",
DROP COLUMN "iconeCategoria";
