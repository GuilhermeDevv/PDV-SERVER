import { prisma } from "../../lib/Prisma";
import { ISaleRepository } from "./ISaleRepository";

import { ICreateVendaDTO } from "../../dtos/VendaDTO";

export class PrismaRepository implements ISaleRepository {
  async create(sale: ICreateVendaDTO) {
    const caixaAberto = await prisma.caixa.findFirst({
      where: { status: true },
    });

    if (!caixaAberto) {
      throw new Error("Nenhum caixa aberto encontrado.");
    }

    const produtoQuantidades = sale.id_produtos.reduce((acc, id_produto) => {
      acc[id_produto] = (acc[id_produto] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    for (const [id_produto, quantidade] of Object.entries(produtoQuantidades)) {
      const produto = await prisma.produto.findUnique({
        where: { id_produto },
      });

      if (!produto) {
        throw new Error(`Produto com ID ${id_produto} não encontrado.`);
      }
    }

    const venda = await prisma.venda.create({
      data: {
        nome_cliente: sale.nome_cliente,
        data: new Date(),
        total: +sale.total,
        caixaId_caixa: caixaAberto.id_caixa,
        id_funcionario: sale.id_funcionario,
      },
    });

    for (const [id_produto, quantidade] of Object.entries(produtoQuantidades)) {
      const valorVenda = sale.valores?.[id_produto] || 0;

      await prisma.vendaProduto.create({
        data: {
          id_venda: venda.id_venda,
          id_produto: id_produto,
          quantidade,
          valor_venda: valorVenda,
        },
      });

      await prisma.produto.update({
        where: { id_produto: id_produto },
        data: { estoque: { decrement: quantidade } },
      });
    }

    return venda;
  }

  async findByAll() {
    const caixaAberto = await prisma.caixa.findFirst({
      where: { status: true },
    });

    if (!caixaAberto) {
      return [];
    }

    const data = await prisma.venda.findMany({
      where: {
        caixaId_caixa: caixaAberto.id_caixa,
      },
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
        funcionario: {
          select: {
            nome: true,
          },
        },
      },
    });

    const restructuredData = data.map((venda) => ({
      ...venda,
      nome_funcionario: venda.funcionario.nome,
      nome_cliente: venda.nome_cliente || "SEM IDENTIFICAÇÃO",
      produtos: venda.produtos.map((vp) => ({
        ...vp,
        quantidade: vp.quantidade,
        valor_venda: vp.valor_venda ?? 0,
        preco: vp.valor_venda ? vp.valor_venda : vp.produto.preco,
        produto: {
          ...vp.produto,
          preco: vp.valor_venda !== 0 ? vp.valor_venda : vp.produto.preco,
        },
      })),
      funcionario: undefined,
    }));

    return restructuredData;
  }

  async findByID(id_caixa: string) {
    const data = await prisma.venda.findMany({
      where: {
        caixaId_caixa: id_caixa,
      },
    });

    return data;
  }
}
