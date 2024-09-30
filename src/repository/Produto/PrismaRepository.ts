import { prisma } from "../../lib/Prisma";
import xlsx from "xlsx";
import path from "path";

import { IProdutoRepository } from "./IProductRepository";
import {
  ICreateProdutoDTO,
  IProdutoReactSelect,
  IUpdateProdutoDTO,
} from "../../dtos/ProdutoDTO";
import { formatCurrency } from "../../utils/formatCurrencyBR";

export class PrismaRepository {
  async create(data: ICreateProdutoDTO) {
    return await prisma.produto.create({ data });
  }

  async findByID(id: string) {
    return await prisma.produto.findUnique({ where: { id_produto: id } });
  }

  async update(id: string, data: IUpdateProdutoDTO) {
    return await prisma.produto.update({ where: { id_produto: id }, data });
  }

  async findByAll() {
    // caso a porcentagem do estoque em relação à quantidade seja 0 ou menor que 10%, a cor deve ser vermelha
    // caso a porcentagem do estoque em relação à quantidade seja menor ou igual a 50%, a cor deve ser amarela
    // caso a porcentagem do estoque em relação à quantidade seja maior que 50%, a cor deve ser verde

    const produtos = await prisma.produto.findMany();

    const produtosFormatted = produtos.map((produto) => {
      let cor;
      const porcentagemEstoque =
        produto.quantidade <= 0
          ? 0
          : (produto.estoque / produto.quantidade) * 100;

      if (porcentagemEstoque <= 0 || porcentagemEstoque < 10) {
        cor = "#b81d13";
      } else if (porcentagemEstoque <= 50) {
        cor = "#efb700";
      } else {
        cor = "#008450";
      }

      return {
        cor,
        ...produto,
      };
    });

    return produtosFormatted;
  }

  async findByProductForReposition() {
    const produtos = await prisma.produto.findMany();

    const produtosParaReposicao = produtos.map((produto) => {
      let cor;
      const porcentagemEstoque =
        produto.quantidade <= 0
          ? 0
          : (produto.estoque / produto.quantidade) * 100;

      if (
        produto.quantidade <= 0 ||
        porcentagemEstoque <= 0 ||
        porcentagemEstoque < 10
      ) {
        cor = "#b81d13";
      } else if (porcentagemEstoque <= 50) {
        cor = "#efb700";
      } else {
        cor = "#008450";
      }

      return {
        cor,
        ...produto,
      };
    });

    const produtosParaReposicaoCount = produtosParaReposicao.filter(
      (produto) => produto.cor === "#b81d13"
    );

    return produtosParaReposicaoCount;
  }

  async findByAllProductsReactSelect() {
    const produtos = await prisma.produto.findMany();

    const produtosFormatted = produtos.map((produto) => {
      return {
        value: produto.id_produto,
        label: `${produto.nome} - ${formatCurrency(produto.preco.toString())}`,
        price: produto.preco,
      } as IProdutoReactSelect;
    });

    return produtosFormatted;
  }

  async importXLS() {
    const filePath = path.join(__dirname, "..", "..", "dist", "produto1.xls");

    const readExcelFile = (filePath: string) => {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      return data.map((row: any) => ({
        custo: row["Custo Unitário"],
        estoque: row["Estoque Atual"],
        id_produto: row["Código"],
        nome: row["Nome"],
        preco: row["Preço"],
        quantidade: row["Disponível"],
      }));
    };

    // Ler o arquivo e obter os dados
    const data = readExcelFile(filePath);
    console.log(data);

    // Salvar os dados no banco de dados
    for (const row of data) {
      const existingProduct = await prisma.produto.findUnique({
        where: { id_produto: row.id_produto.toString() },
      });

      if (!existingProduct) {
        // Criar um novo produto
        await prisma.produto.create({
          data: {
            nome: row.nome,
            id_produto: row.id_produto.toString(),
            preco: row.preco,
            estoque: row.estoque ?? 0,
            custo: row.custo,
            quantidade: row.quantidade ?? 0,
          },
        });
      }
    }

    console.log("Dados salvos com sucesso!");
  }
}
