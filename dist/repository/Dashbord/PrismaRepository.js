"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRepository = void 0;
const Prisma_1 = require("../../lib/Prisma");
class PrismaRepository {
    // Método para obter informações de quantidade
    getQuantityInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return {
                    error: true,
                    message: "Erro ao buscar informações do funcionário",
                    data: [],
                    statusCode: 500,
                };
            }
            // Buscar o usuário pelo ID e verificar o nível de acesso
            const funcionario = yield Prisma_1.prisma.funcionario.findUnique({
                where: { id_funcionario: id },
                include: { cargo: true },
            });
            if (!funcionario) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data: null,
                    statusCode: 404,
                };
            }
            const nivelAcesso = funcionario.cargo.nivel_acesso;
            // Consultas agregadas para obter contagens e vendas de hoje
            const [vendasQuantity, produtosQuantity, funcionariosQuantity, vendasDeHoje, vendasQuantityMesPassado, produtosQuantityMesPassado, funcionariosQuantityMesPassado, vendasDeOntem,] = yield Promise.all([
                Prisma_1.prisma.venda.count({
                    where: nivelAcesso === "MINIMO" ? { id_funcionario: id } : {},
                }),
                Prisma_1.prisma.produto.count(),
                Prisma_1.prisma.funcionario.count(),
                Prisma_1.prisma.venda.findMany({
                    where: Object.assign({ data: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                            lte: new Date(new Date().setHours(23, 59, 59, 999)),
                        } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                    include: {
                        produtos: {
                            include: {
                                produto: true,
                            },
                        },
                    },
                }),
                Prisma_1.prisma.venda.count({
                    where: Object.assign({ data: {
                            gte: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)),
                            lte: new Date(new Date().setMonth(new Date().getMonth(), 0)),
                        } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                }),
                Prisma_1.prisma.produto.count({
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)),
                            lte: new Date(new Date().setMonth(new Date().getMonth(), 0)),
                        },
                    },
                }),
                Prisma_1.prisma.funcionario.count({
                    where: {
                        createdAt: {
                            gte: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)),
                            lte: new Date(new Date().setMonth(new Date().getMonth(), 0)),
                        },
                    },
                }),
                Prisma_1.prisma.venda.findMany({
                    where: Object.assign({ data: {
                            gte: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)),
                            lte: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999)),
                        } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                    include: {
                        produtos: {
                            include: {
                                produto: true,
                            },
                        },
                    },
                }),
            ]);
            const lucroTotalDeHoje = vendasDeHoje.reduce((acc, venda) => {
                const custoProdutos = venda.produtos.reduce((acc, vendaProduto) => {
                    return acc + vendaProduto.produto.custo * vendaProduto.quantidade;
                }, 0);
                const totalVenda = venda.produtos.reduce((total, produto) => {
                    const valorBase = produto.valor_venda > 0 ? produto.valor_venda : produto.produto.preco;
                    const valorProduto = valorBase * produto.quantidade;
                    const valorComDesconto = produto.produto.desconto > 0 && produto.valor_venda == 0
                        ? valorProduto - valorProduto * (produto.produto.desconto / 100)
                        : valorProduto;
                    return valorComDesconto;
                }, 0);
                return acc + (totalVenda - custoProdutos);
            }, 0);
            function formatCurrency(value) {
                return new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(value);
            }
            const vendasDeHojeEmReais = vendasDeHoje.reduce((acc, venda) => {
                const totalVenda = venda.produtos.reduce((total, produto) => {
                    const valorBase = produto.valor_venda > 0 ? produto.valor_venda : produto.produto.preco;
                    const valorProduto = valorBase * produto.quantidade;
                    const valorComDesconto = produto.produto.desconto > 0 && produto.valor_venda == 0
                        ? valorProduto - valorProduto * (produto.produto.desconto / 100)
                        : valorProduto;
                    return valorComDesconto;
                }, 0);
                return acc + totalVenda;
            }, 0);
            const lucroTotalDeOntem = vendasDeOntem.reduce((acc, venda) => {
                const custoProdutos = venda.produtos.reduce((acc, vendaProduto) => {
                    return acc + vendaProduto.produto.custo * vendaProduto.quantidade;
                }, 0);
                const totalVenda = venda.produtos.reduce((total, produto) => {
                    const valorBase = produto.valor_venda > 0 ? produto.valor_venda : produto.produto.preco;
                    const valorProduto = valorBase * produto.quantidade;
                    const valorComDesconto = produto.produto.desconto > 0 && produto.valor_venda == 0
                        ? valorProduto - valorProduto * (produto.produto.desconto / 100)
                        : valorProduto;
                    return valorComDesconto;
                }, 0);
                return acc + (totalVenda - custoProdutos);
            }, 0);
            const vendasDeOntemEmReais = vendasDeOntem.reduce((acc, venda) => {
                const totalVenda = venda.produtos.reduce((total, produto) => {
                    const valorBase = produto.valor_venda > 0 ? produto.valor_venda : produto.produto.preco;
                    const valorProduto = valorBase * produto.quantidade;
                    const valorComDesconto = produto.produto.desconto > 0 && produto.valor_venda == 0
                        ? valorProduto - valorProduto * (produto.produto.desconto / 100)
                        : valorProduto;
                    return valorComDesconto;
                }, 0);
                return acc + totalVenda;
            }, 0);
            const calcularVariacao = (atual, passado) => {
                if (passado === 0)
                    return atual > 0 ? 100 : 0;
                return ((atual - passado) / passado) * 100;
            };
            const getIconInfo = (variacao) => {
                if (variacao > 0)
                    return "ArrowUp";
                if (variacao < 0)
                    return "ArrowDown";
                return "ArrowRight"; // Ícone reto
            };
            return [
                {
                    icon: "MonetizationOnIcon",
                    text: "VENDAS",
                    quantity: vendasQuantity,
                    color: "primaryBackground",
                    iconInfo: getIconInfo(calcularVariacao(vendasQuantity, vendasQuantityMesPassado)),
                    valueInfo: `${calcularVariacao(vendasQuantity, vendasQuantityMesPassado).toFixed(2)}%`,
                    labelInfo: "Em relação ao mês passado",
                    v1: vendasQuantity,
                    v2: vendasQuantityMesPassado,
                },
                {
                    icon: "GroupIcon",
                    text: "FUNCIONÁRIOS",
                    quantity: funcionariosQuantity,
                    color: "secondaryBackground",
                    iconInfo: getIconInfo(calcularVariacao(funcionariosQuantity, funcionariosQuantityMesPassado)),
                    valueInfo: `${calcularVariacao(funcionariosQuantity, funcionariosQuantityMesPassado).toFixed(2)}%`,
                    labelInfo: "Em relação ao mês passado",
                    v1: funcionariosQuantityMesPassado,
                    v2: funcionariosQuantity,
                },
                {
                    icon: "ShoppingCartIcon",
                    text: "PRODUTOS",
                    quantity: produtosQuantity,
                    color: "tertiaryBackground",
                    iconInfo: getIconInfo(calcularVariacao(produtosQuantity, produtosQuantityMesPassado)),
                    valueInfo: `${calcularVariacao(produtosQuantity, produtosQuantityMesPassado).toFixed(2)}%`,
                    labelInfo: "Em relação ao mês passado",
                    v1: produtosQuantityMesPassado,
                    v2: produtosQuantity,
                },
                {
                    icon: "InventoryIcon",
                    text: "PRODUTOS PARA REPOSIÇÃO",
                    quantity: 0, // Informação genérica
                    color: "quaternaryBackground",
                    iconInfo: "ArrowRight", // Ícone reto
                    valueInfo: "N/A",
                    labelInfo: "Dados não disponíveis",
                    v1: 0,
                    v2: 0,
                },
                {
                    icon: "MonetizationOnIcon",
                    text: "LUCRO TOTAL DE HOJE",
                    quantity: formatCurrency(lucroTotalDeHoje),
                    color: "quinaryBackground",
                    iconInfo: getIconInfo(calcularVariacao(lucroTotalDeHoje, lucroTotalDeOntem)),
                    valueInfo: `${calcularVariacao(lucroTotalDeHoje, lucroTotalDeOntem).toFixed(2)}%`,
                    labelInfo: "Em relação a ontem",
                    v1: lucroTotalDeOntem,
                    v2: lucroTotalDeHoje,
                },
                {
                    icon: "MonetizationOnIcon",
                    text: "VENDAS TOTAL DE HOJE",
                    quantity: formatCurrency(vendasDeHojeEmReais),
                    color: "senaryBackground",
                    iconInfo: getIconInfo(calcularVariacao(vendasDeHojeEmReais, vendasDeOntemEmReais)),
                    valueInfo: `${calcularVariacao(vendasDeHojeEmReais, vendasDeOntemEmReais).toFixed(2)}%`,
                    labelInfo: "Em relação a ontem",
                    v1: vendasDeOntemEmReais,
                    v2: vendasDeHojeEmReais,
                },
            ];
        });
    }
    // Método para obter informações de vendas
    getSalesValue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return {
                    error: true,
                    message: "Erro ao buscar informações do funcionário",
                    data: null,
                    statusCode: 500,
                };
            }
            // Buscar o usuário pelo ID e verificar o nível de acesso
            const funcionario = yield Prisma_1.prisma.funcionario.findUnique({
                where: { id_funcionario: id },
                include: { cargo: true },
            });
            if (!funcionario) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data: null,
                    statusCode: 404,
                };
            }
            const nivelAcesso = funcionario.cargo.nivel_acesso;
            const dataAtual = new Date();
            const diaSemanaAtual = dataAtual.getDay();
            const inicioSemanaAtual = new Date(dataAtual);
            inicioSemanaAtual.setHours(0, 0, 0, 0);
            inicioSemanaAtual.setDate(dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1));
            const inicioSemanaPassada = new Date(inicioSemanaAtual);
            inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);
            const vendasSemanaAtual = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaAtual,
                        lte: dataAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                include: {
                    produtos: {
                        include: {
                            produto: true,
                        },
                    },
                },
            });
            const vendasSemanaPassada = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaPassada,
                        lte: inicioSemanaAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                include: {
                    produtos: {
                        include: {
                            produto: true,
                        },
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
            const agruparVendasPorDia = (vendas) => {
                return vendas.reduce((acc, venda) => {
                    const diaSemana = diasSemana[new Date(venda.data).getDay()];
                    if (!acc[diaSemana]) {
                        acc[diaSemana] = 0;
                    }
                    const totalVenda = venda.produtos.reduce((total, produto) => {
                        const valorBase = produto.valor_venda > 0
                            ? produto.valor_venda
                            : produto.produto.preco;
                        const valorProduto = valorBase * produto.quantidade;
                        const valorComDesconto = produto.produto.desconto > 0 && produto.valor_venda == 0
                            ? valorProduto - valorProduto * (produto.produto.desconto / 100)
                            : valorProduto;
                        return valorComDesconto;
                    }, 0);
                    acc[diaSemana] += totalVenda;
                    return acc;
                }, {});
            };
            const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
            const vendasAgrupadasSemanaPassada = agruparVendasPorDia(vendasSemanaPassada);
            function formatCurrency(value) {
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
        });
    }
    // Método para obter informações de lucro
    getSalesProfit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return {
                    error: true,
                    message: "Erro ao buscar informações do funcionário",
                    data: null,
                    statusCode: 500,
                };
            }
            // Buscar o usuário pelo ID e verificar o nível de acesso
            const funcionario = yield Prisma_1.prisma.funcionario.findUnique({
                where: { id_funcionario: id },
                include: { cargo: true },
            });
            if (!funcionario) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data: null,
                    statusCode: 404,
                };
            }
            const nivelAcesso = funcionario.cargo.nivel_acesso;
            const dataAtual = new Date();
            const diaSemanaAtual = dataAtual.getDay();
            const inicioSemanaAtual = new Date(dataAtual);
            inicioSemanaAtual.setHours(0, 0, 0, 0);
            inicioSemanaAtual.setDate(dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1));
            const inicioSemanaPassada = new Date(inicioSemanaAtual);
            inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);
            const vendasSemanaAtual = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaAtual,
                        lte: dataAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                include: {
                    produtos: {
                        include: {
                            produto: true,
                        },
                    },
                },
            });
            const vendasSemanaPassada = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaPassada,
                        lte: inicioSemanaAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                include: {
                    produtos: {
                        include: {
                            produto: true,
                        },
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
            const agruparVendasPorDia = (vendas) => {
                return vendas.reduce((acc, venda) => {
                    const diaSemana = diasSemana[new Date(venda.data).getDay()];
                    if (!acc[diaSemana]) {
                        acc[diaSemana] = 0;
                    }
                    acc[diaSemana] += venda.total;
                    return acc;
                }, {});
            };
            const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
            const vendasAgrupadasSemanaPassada = agruparVendasPorDia(vendasSemanaPassada);
            const produtosVendidosSemanaAtual = yield Prisma_1.prisma.vendaProduto.findMany({
                where: {
                    venda: Object.assign({ data: {
                            gte: inicioSemanaAtual,
                            lte: dataAtual,
                        } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                },
                include: {
                    venda: true,
                    produto: true,
                },
            });
            const produtosVendidosSemanaPassada = yield Prisma_1.prisma.vendaProduto.findMany({
                where: {
                    venda: Object.assign({ data: {
                            gte: inicioSemanaPassada,
                            lte: inicioSemanaAtual,
                        } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
                },
                include: {
                    venda: true,
                    produto: true,
                },
            });
            const calcularCustoTotal = (produtos) => {
                return produtos.reduce((acc, produto) => {
                    const diaSemana = diasSemana[new Date(produto.venda.data).getDay()];
                    if (!acc[diaSemana]) {
                        acc[diaSemana] = 0;
                    }
                    acc[diaSemana] += produto.produto.custo * produto.quantidade;
                    return acc;
                }, {});
            };
            const custoTotalSemanaAtual = calcularCustoTotal(produtosVendidosSemanaAtual);
            const custoTotalSemanaPassada = calcularCustoTotal(produtosVendidosSemanaPassada);
            function formatCurrency(value) {
                return new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(value);
            }
            const resultado = diasSemana.map((dia) => ({
                name: dia,
                Atual: (vendasAgrupadasSemanaAtual[dia] || 0) -
                    (custoTotalSemanaAtual[dia] || 0),
                Passada: (vendasAgrupadasSemanaPassada[dia] || 0) -
                    (custoTotalSemanaPassada[dia] || 0),
                AtualFormatado: formatCurrency((vendasAgrupadasSemanaAtual[dia] || 0) -
                    (custoTotalSemanaAtual[dia] || 0)),
                PassadaFormatado: formatCurrency((vendasAgrupadasSemanaPassada[dia] || 0) -
                    (custoTotalSemanaPassada[dia] || 0)),
            }));
            return resultado;
        });
    }
    // Método para obter informações de contagem
    getSalesCount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return {
                    error: true,
                    message: "Erro ao buscar informações do funcionário",
                    data: null,
                    statusCode: 500,
                };
            }
            // Buscar o usuário pelo ID e verificar o nível de acesso
            const funcionario = yield Prisma_1.prisma.funcionario.findUnique({
                where: { id_funcionario: id },
                include: { cargo: true },
            });
            if (!funcionario) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data: null,
                    statusCode: 404,
                };
            }
            const nivelAcesso = funcionario.cargo.nivel_acesso;
            const dataAtual = new Date();
            const diaSemanaAtual = dataAtual.getDay();
            const inicioSemanaAtual = new Date(dataAtual);
            inicioSemanaAtual.setHours(0, 0, 0, 0);
            inicioSemanaAtual.setDate(dataAtual.getDate() - diaSemanaAtual + (diaSemanaAtual === 0 ? -6 : 1));
            const inicioSemanaPassada = new Date(inicioSemanaAtual);
            inicioSemanaPassada.setDate(inicioSemanaAtual.getDate() - 7);
            const vendasSemanaAtual = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaAtual,
                        lte: dataAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
            });
            const vendasSemanaPassada = yield Prisma_1.prisma.venda.findMany({
                where: Object.assign({ data: {
                        gte: inicioSemanaPassada,
                        lte: inicioSemanaAtual,
                    } }, (nivelAcesso === "MINIMO" && { id_funcionario: id })),
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
            const agruparVendasPorDia = (vendas) => {
                return vendas.reduce((acc, venda) => {
                    const diaSemana = diasSemana[new Date(venda.data).getDay()];
                    if (!acc[diaSemana]) {
                        acc[diaSemana] = 0;
                    }
                    acc[diaSemana] += 1;
                    return acc;
                }, {});
            };
            const vendasAgrupadasSemanaAtual = agruparVendasPorDia(vendasSemanaAtual);
            const vendasAgrupadasSemanaPassada = agruparVendasPorDia(vendasSemanaPassada);
            const resultado = diasSemana.map((dia) => ({
                name: dia,
                Atual: vendasAgrupadasSemanaAtual[dia] || 0,
                Passada: vendasAgrupadasSemanaPassada[dia] || 0,
            }));
            return resultado;
        });
    }
}
exports.PrismaRepository = PrismaRepository;
