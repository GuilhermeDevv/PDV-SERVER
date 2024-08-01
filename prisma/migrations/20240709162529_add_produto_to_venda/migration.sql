-- CreateTable
CREATE TABLE "_VendaProdutos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VendaProdutos_AB_unique" ON "_VendaProdutos"("A", "B");

-- CreateIndex
CREATE INDEX "_VendaProdutos_B_index" ON "_VendaProdutos"("B");

-- AddForeignKey
ALTER TABLE "_VendaProdutos" ADD CONSTRAINT "_VendaProdutos_A_fkey" FOREIGN KEY ("A") REFERENCES "Produto"("id_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendaProdutos" ADD CONSTRAINT "_VendaProdutos_B_fkey" FOREIGN KEY ("B") REFERENCES "Venda"("id_venda") ON DELETE CASCADE ON UPDATE CASCADE;
