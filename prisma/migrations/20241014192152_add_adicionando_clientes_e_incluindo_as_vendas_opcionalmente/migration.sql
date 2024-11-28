-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "id_cliente" TEXT;

-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "observacao" TEXT,
    "valor_debito" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credito_conta" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_cliente_key" ON "Cliente"("id_cliente");

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;
