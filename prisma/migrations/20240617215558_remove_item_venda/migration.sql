/*
  Warnings:

  - You are about to drop the `ItemVenda` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `custo` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemVenda" DROP CONSTRAINT "ItemVenda_id_produto_fkey";

-- DropForeignKey
ALTER TABLE "ItemVenda" DROP CONSTRAINT "ItemVenda_id_venda_fkey";

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "custo" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "ItemVenda";
