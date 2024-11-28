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
exports.GetInfoUserServices = void 0;
class GetInfoUserServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = user.userId;
            if (!id) {
                return {
                    error: true,
                    message: "Erro ao buscar informações do funcionário",
                    data: null,
                    statusCode: 500,
                };
            }
            // Buscar o usuário pelo ID e verificar o nível de acesso
            const funcionario = yield this.repository.user(id);
            if (!funcionario) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data: null,
                    statusCode: 404,
                };
            }
            const nivelAcesso = funcionario.infoCargo.nivel_acesso;
            // Obter as informações do usuário
            const data = yield this.repository.infoUser(id);
            if (!data || !Array.isArray(data)) {
                return {
                    error: true,
                    message: "Informações do funcionário não encontradas",
                    data,
                    statusCode: 404,
                };
            }
            // Obter a data atual
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            // Inicializar um objeto para armazenar os dados formatados
            const formatData = data.reduce((acc, item) => {
                const date = new Date(item.data);
                const month = date.getMonth();
                const year = date.getFullYear();
                const key = `${month + 1}/${year}`;
                if (acc[key]) {
                    acc[key] += 1;
                }
                else {
                    acc[key] = 1;
                }
                return acc;
            }, {});
            // Inicializar um array para armazenar os dados dos últimos 6 meses
            const formattedArrayVendas = [];
            const monthNames = [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
            ];
            // Preencher o array com os últimos 6 meses
            for (let i = 0; i < 6; i++) {
                const month = (currentMonth - i + 12) % 12;
                const year = currentYear - Math.floor((currentMonth - i) / 12);
                const key = `${month + 1}/${year}`;
                formattedArrayVendas.unshift({
                    x: monthNames[month],
                    y: formatData[key] || 0,
                });
            }
            // Calcular o lucro de vendas dos últimos 6 meses, se o nível de acesso for "TOTAL"
            let formattedArrayLucro = [];
            if (nivelAcesso === "TOTAL") {
                const lucroTotal = data.reduce((acc, venda) => {
                    const custoProdutos = venda.produtos.reduce((acc, vendaProduto) => {
                        return (acc +
                            vendaProduto.produto.custo * vendaProduto.quantidade);
                    }, 0);
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
                    return acc + (totalVenda - custoProdutos);
                }, 0);
                // Preencher o array com os últimos 6 meses de lucro
                for (let i = 0; i < 6; i++) {
                    const month = (currentMonth - i + 12) % 12;
                    const year = currentYear - Math.floor((currentMonth - i) / 12);
                    const key = `${month + 1}/${year}`;
                    formattedArrayLucro.unshift({
                        x: monthNames[month],
                        y: lucroTotal[key] || 0,
                    });
                }
            }
            return {
                error: false,
                message: "Informações do funcionário encontradas",
                data: {
                    vendas: formattedArrayVendas,
                    total_vendas: data.length,
                    lucro: nivelAcesso === "TOTAL" ? formattedArrayLucro : null,
                },
                statusCode: 200,
            };
        });
    }
}
exports.GetInfoUserServices = GetInfoUserServices;
