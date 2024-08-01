import { prisma } from "../../lib/Prisma";

export class PrismaRepository {
  async getQuantityInfo() {
    const vendasQuantity = await prisma.venda.count();
    const produtosQuantity = await prisma.produto.count();
    const funcionariosQuantity = await prisma.funcionario.count();

    const produtos = await prisma.produto.findMany({
      select: {
        quantidade: true,
        estoque: true,
      },
    });

    const produtosParaReposicao = produtos.map((produto) => {
      let cor;
      const porcentagemEstoque = (produto.estoque / produto.quantidade) * 100;

      if (produto.estoque === 0 || porcentagemEstoque < 10) {
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
    ];
  }

  async getSalesValue() {
    const dataAtual = new Date();
    const diaSemanaAtual = dataAtual.getDay();
    const inicioSemanaAtual = new Date(dataAtual);
    inicioSemanaAtual.setDate(
      dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1)
    );

    const inicioSemanaPassada = new Date(inicioSemanaAtual);
    inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7); // Segunda-feira da semana passada

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

    const agruparVendasPorDia = (vendas: any[], inicioSemana: Date) => {
      return vendas.reduce((acc, venda) => {
        const diaSemana = diasSemana[new Date(venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += venda.total;
        return acc;
      }, {} as Record<string, number>);
    };

    const vendasAgrupadasSemanaAtual = agruparVendasPorDia(
      vendasSemanaAtual,
      inicioSemanaAtual
    );
    const vendasAgrupadasSemanaPassada = agruparVendasPorDia(
      vendasSemanaPassada,
      inicioSemanaPassada
    );

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

  async getSalesCount() {
    const dataAtual = new Date();
    const diaSemanaAtual = dataAtual.getDay();
    const inicioSemanaAtual = new Date(dataAtual);
    inicioSemanaAtual.setDate(
      dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1)
    );

    const inicioSemanaPassada = new Date(inicioSemanaAtual);
    inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7); // Segunda-feira da semana passada

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

    const agruparVendasPorDia = (vendas: any[], inicioSemana: Date) => {
      return vendas.reduce((acc, venda) => {
        const diaSemana = diasSemana[new Date(venda.data).getDay()];
        if (!acc[diaSemana]) {
          acc[diaSemana] = 0;
        }
        acc[diaSemana] += 1;
        return acc;
      }, {} as Record<string, number>);
    };

    const vendasAgrupadasSemanaAtual = agruparVendasPorDia(
      vendasSemanaAtual,
      inicioSemanaAtual
    );
    const vendasAgrupadasSemanaPassada = agruparVendasPorDia(
      vendasSemanaPassada,
      inicioSemanaPassada
    );

    const resultado = diasSemana.map((dia) => ({
      name: dia,
      Atual: vendasAgrupadasSemanaAtual[dia] || 0,
      Passada: vendasAgrupadasSemanaPassada[dia] || 0,
    }));

    return resultado;
  }
}
