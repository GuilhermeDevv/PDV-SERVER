-- CreateTable
CREATE TABLE "VendaProduto" (
    "id_vendaProduto" SERIAL NOT NULL,
    "id_venda" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "VendaProduto_pkey" PRIMARY KEY ("id_vendaProduto")
);

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "Venda"("id_venda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
