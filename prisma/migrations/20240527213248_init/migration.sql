-- CreateTable
CREATE TABLE "Produto" (
    "id_produto" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id_funcionario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL DEFAULT 'Administrador',
    "senha" TEXT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id_funcionario")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id_venda" TEXT NOT NULL,
    "id_funcionario" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "caixaId_caixa" TEXT,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id_venda")
);

-- CreateTable
CREATE TABLE "ItemVenda" (
    "id_item" TEXT NOT NULL,
    "id_venda" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemVenda_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "Caixa" (
    "id_caixa" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" TIMESTAMP(3),

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id_caixa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_id_produto_key" ON "Produto"("id_produto");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_id_funcionario_key" ON "Funcionario"("id_funcionario");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_id_venda_key" ON "Venda"("id_venda");

-- CreateIndex
CREATE UNIQUE INDEX "ItemVenda_id_item_key" ON "ItemVenda"("id_item");

-- CreateIndex
CREATE UNIQUE INDEX "Caixa_id_caixa_key" ON "Caixa"("id_caixa");

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_id_funcionario_fkey" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_caixaId_caixa_fkey" FOREIGN KEY ("caixaId_caixa") REFERENCES "Caixa"("id_caixa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "Venda"("id_venda") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemVenda" ADD CONSTRAINT "ItemVenda_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
