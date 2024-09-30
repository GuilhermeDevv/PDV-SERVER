import { prisma } from "../../lib/Prisma";

export class PrismaRepository {
  async getQuantityInfo() {
    const vendasQuantity = await prisma.venda.count();
    const produtosQuantity = await prisma.produto.count();
    const funcionariosQuantity = await prisma.funcionario.count();

    const vendasDeHoje = await prisma.venda.findMany({
      where: {
        data: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });

    const lucroTotalDeHoje = vendasDeHoje.reduce((acc, venda) => {
      const totalVenda = venda.total;
      const custoProdutos = venda.produtos.reduce((acc, vendaProduto) => {
        return acc + vendaProduto.produto.custo * vendaProduto.quantidade;
      }, 0);
      return acc + (totalVenda - custoProdutos);
    }, 0);

    const produtos = await prisma.produto.findMany({
      select: {
        quantidade: true,
        estoque: true,
      },
    });

    const produtosParaReposicao = produtos.map((produto) => {
      let cor;
      const porcentagemEstoque = (produto.estoque / produto.quantidade) * 100;

      if (
        produto.quantidade <= 0 ||
        porcentagemEstoque <= 0 ||
        porcentagemEstoque < 10
      ) {
        cor = "vermelha";
      } else if (porcentagemEstoque <= 50) {
        cor = "amarela";
      } else {
        cor = "verde";
      }

      return {
        ...produto,
        cor,
      };
    });

    const produtosParaReposicaoCount = produtosParaReposicao.filter(
      (produto) => produto.cor === "vermelha"
    );

    function formatCurrency(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }

    const vendasDeHojeEmReais = vendasDeHoje.reduce((acc, venda) => {
      return acc + venda.total;
    }, 0);

    return [
      {
        icon: "MonetizationOnIcon",
        text: "VENDAS",
        quantity: vendasQuantity,
      },
      {
        icon: "GroupIcon",
        text: "FUNCIONÁRIOS",
        quantity: funcionariosQuantity,
      },
      {
        icon: "ShoppingCartIcon",
        text: "PRODUTOS",
        quantity: produtosQuantity,
      },
      {
        icon: "InventoryIcon",
        text: "PRODUTOS PARA REPOSIÇÃO",
        quantity: produtosParaReposicaoCount.length,
      },
      {
        icon: "MonetizationOnIcon",
        text: "LUCRO TOTAL DE HOJE",
        quantity: formatCurrency(lucroTotalDeHoje),
      },
      {
        icon: "MonetizationOnIcon",
        text: "VENDAS TOTAL DE HOJE",
        quantity: formatCurrency(vendasDeHojeEmReais),
      },
    ];
  }

  async getSalesValue() {
    const dataAtual = new Date();
    const diaSemanaAtual = dataAtual.getDay();
    const inicioSemanaAtual = new Date(dataAtual);
    inicioSemanaAtual.setHours(0, 0, 0, 0);
    inicioSemanaAtual.setDate(
      dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1)
    );

    const inicioSemanaPassada = new Date(inicioSemanaAtual);
    inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);

    const vendasSemanaAtual = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaAtual,
          lte: dataAtual,
        },
      },
    });

    const vendasSemanaPassada = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaPassada,
          lte: inicioSemanaAtual,
        },
      },
    });

    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const agruparVendasPorDia = (vendas: any[]) => {
      return vendas.reduce((acc, venda) => {
        const diaSemana = diasSemana[new Date(venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += venda.total;
        return acc;
      }, {} as Record<string, number>);
    };

    const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
    const vendasAgrupadasSemanaPassada =
      agruparVendasPorDia(vendasSemanaPassada);

    function formatCurrency(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }

    const resultado = diasSemana.map((dia) => ({
      name: dia,
      Atual: vendasAgrupadasSemanaAtual[dia] || 0,
      Passada: vendasAgrupadasSemanaPassada[dia] || 0,
      AtualFormatado: formatCurrency(vendasAgrupadasSemanaAtual[dia] || 0),
      PassadaFormatado: formatCurrency(vendasAgrupadasSemanaPassada[dia] || 0),
    }));

    return resultado;
  }

  async getSalesProfit() {
    const dataAtual = new Date();
    const diaSemanaAtual = dataAtual.getDay();
    const inicioSemanaAtual = new Date(dataAtual);
    inicioSemanaAtual.setHours(0, 0, 0, 0);
    inicioSemanaAtual.setDate(
      dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1)
    );

    const inicioSemanaPassada = new Date(inicioSemanaAtual);
    inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);

    const vendasSemanaAtual = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaAtual,
          lte: dataAtual,
        },
      },
    });

    const vendasSemanaPassada = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaPassada,
          lte: inicioSemanaAtual,
        },
      },
    });

    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const agruparVendasPorDia = (vendas: any[]) => {
      return vendas.reduce((acc, venda) => {
        const diaSemana = diasSemana[new Date(venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += venda.total;
        return acc;
      }, {} as Record<string, number>);
    };

    const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
    const vendasAgrupadasSemanaPassada =
      agruparVendasPorDia(vendasSemanaPassada);

    const produtosVendidosSemanaAtual = await prisma.vendaProduto.findMany({
      where: {
        venda: {
          data: {
            gte: inicioSemanaAtual,
            lte: dataAtual,
          },
        },
      },
      include: {
        venda: true,
        produto: true,
      },
    });

    const produtosVendidosSemanaPassada = await prisma.vendaProduto.findMany({
      where: {
        venda: {
          data: {
            gte: inicioSemanaPassada,
            lte: inicioSemanaAtual,
          },
        },
      },
      include: {
        venda: true,
        produto: true,
      },
    });

    const calcularCustoTotal = (produtos: any[]) => {
      return produtos.reduce((acc, produto) => {
        const diaSemana = diasSemana[new Date(produto.venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += produto.produto.custo * produto.quantidade;
        return acc;
      }, {} as Record<string, number>);
    };

    const custoTotalSemanaAtual = calcularCustoTotal(
      produtosVendidosSemanaAtual
    );
    const custoTotalSemanaPassada = calcularCustoTotal(
      produtosVendidosSemanaPassada
    );

    function formatCurrency(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }

    const resultado = diasSemana.map((dia) => ({
      name: dia,
      Atual:
        (vendasAgrupadasSemanaAtual[dia] || 0) -
        (custoTotalSemanaAtual[dia] || 0),
      Passada:
        (vendasAgrupadasSemanaPassada[dia] || 0) -
        (custoTotalSemanaPassada[dia] || 0),
      AtualFormatado: formatCurrency(
        (vendasAgrupadasSemanaAtual[dia] || 0) -
          (custoTotalSemanaAtual[dia] || 0)
      ),
      PassadaFormatado: formatCurrency(
        (vendasAgrupadasSemanaPassada[dia] || 0) -
          (custoTotalSemanaPassada[dia] || 0)
      ),
    }));

    return resultado;
  }

  async getSalesCount() {
    const dataAtual = new Date();
    const diaSemanaAtual = dataAtual.getDay();
    const inicioSemanaAtual = new Date(dataAtual);
    inicioSemanaAtual.setHours(0, 0, 0, 0);
    inicioSemanaAtual.setDate(
      dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1)
    );

    const inicioSemanaPassada = new Date(inicioSemanaAtual);
    inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);

    const vendasSemanaAtual = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaAtual,
          lte: dataAtual,
        },
      },
    });

    const vendasSemanaPassada = await prisma.venda.findMany({
      where: {
        data: {
          gte: inicioSemanaPassada,
          lte: inicioSemanaAtual,
        },
      },
    });

    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const agruparVendasPorDia = (vendas: any[]) => {
      return vendas.reduce((acc, venda) => {
        const diaSemana = diasSemana[new Date(venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += 1;
        return acc;
      }, {} as Record<string, number>);
    };

    const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
    const vendasAgrupadasSemanaPassada =
      agruparVendasPorDia(vendasSemanaPassada);

    const resultado = diasSemana.map((dia) => ({
      name: dia,
      Atual: vendasAgrupadasSemanaAtual[dia] || 0,
      Passada: vendasAgrupadasSemanaPassada[dia] || 0,
    }));

    return resultado;
  }
}
