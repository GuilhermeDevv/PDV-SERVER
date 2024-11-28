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
import { ICreateCategoriaProdutoDTO } from "../../dtos/CategoriaProdutoDTO";

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

    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });

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
      const price = produto.desconto
        ? produto.preco * (1 - produto.desconto / 100)
        : produto.preco;
      return {
        value: produto.id_produto,
        label: `${produto.nome} - ${formatCurrency(price.toString())}`,
        price,
      } as IProdutoReactSelect;
    });

    return produtosFormatted;
  }

  async createCategoriaProduto(data: ICreateCategoriaProdutoDTO) {
    return await prisma.categoriaProduto.create({ data });
  }

  async findAllCategorias() {
    return await prisma.categoriaProduto.findMany();
  }
}
