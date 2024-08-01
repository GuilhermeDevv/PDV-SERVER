/*
  Warnings:

  - The primary key for the `Venda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_venda` column on the `Venda` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_VendaProdutos` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id_venda` on the `VendaProduto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "VendaProduto" DROP CONSTRAINT "VendaProduto_id_venda_fkey";

-- DropForeignKey
ALTER TABLE "_VendaProdutos" DROP CONSTRAINT "_VendaProdutos_A_fkey";

-- DropForeignKey
ALTER TABLE "_VendaProdutos" DROP CONSTRAINT "_VendaProdutos_B_fkey";

-- AlterTable
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_pkey",
DROP COLUMN "id_venda",
ADD COLUMN     "id_venda" SERIAL NOT NULL,
ADD CONSTRAINT "Venda_pkey" PRIMARY KEY ("id_venda");

-- AlterTable
ALTER TABLE "VendaProduto" DROP COLUMN "id_venda",
ADD COLUMN     "id_venda" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_VendaProdutos";

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "Venda"("id_venda") ON DELETE RESTRICT ON UPDATE CASCADE;
