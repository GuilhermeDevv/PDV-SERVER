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
    create(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const caixaAberto = yield Prisma_1.prisma.caixa.findFirst({
                where: { status: true },
            });
            if (!caixaAberto) {
                throw new Error("Nenhum caixa aberto encontrado.");
            }
            const produtoQuantidades = sale.id_produtos.reduce((acc, id_produto) => {
                acc[id_produto] = (acc[id_produto] || 0) + 1;
                return acc;
            }, {});
            for (const [id_produto, quantidade] of Object.entries(produtoQuantidades)) {
                const produto = yield Prisma_1.prisma.produto.findUnique({
                    where: { id_produto },
                });
                if (!produto) {
                    throw new Error(`Produto com ID ${id_produto} não encontrado.`);
                }
            }
            const venda = yield Prisma_1.prisma.venda.create({
                data: {
                    nome_cliente: sale.nome_cliente,
                    data: new Date(),
                    total: +sale.total,
                    caixaId_caixa: caixaAberto.id_caixa,
                    id_funcionario: sale.id_funcionario,
                },
            });
            for (const [id_produto, quantidade] of Object.entries(produtoQuantidades)) {
                const valorVenda = ((_a = sale.valores) === null || _a === void 0 ? void 0 : _a[id_produto]) || 0;
                yield Prisma_1.prisma.vendaProduto.create({
                    data: {
                        id_venda: venda.id_venda,
                        id_produto: id_produto,
                        quantidade,
                        valor_venda: valorVenda,
                    },
                });
                yield Prisma_1.prisma.produto.update({
                    where: { id_produto: id_produto },
                    data: { estoque: { decrement: quantidade } },
                });
            }
            return venda;
        });
    }
    findByAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const caixaAberto = yield Prisma_1.prisma.caixa.findFirst({
                where: { status: true },
            });
            if (!caixaAberto) {
                return [];
            }
            const data = yield Prisma_1.prisma.venda.findMany({
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
            const restructuredData = data.map((venda) => (Object.assign(Object.assign({}, venda), { nome_funcionario: venda.funcionario.nome, nome_cliente: venda.nome_cliente || "SEM IDENTIFICAÇÃO", produtos: venda.produtos.map((vp) => {
                    var _a;
                    return (Object.assign(Object.assign({}, vp), { quantidade: vp.quantidade, valor_venda: (_a = vp.valor_venda) !== null && _a !== void 0 ? _a : 0, preco: vp.valor_venda ? vp.valor_venda : vp.produto.preco, produto: Object.assign(Object.assign({}, vp.produto), { preco: vp.valor_venda !== 0 ? vp.valor_venda : vp.produto.preco }) }));
                }), funcionario: undefined })));
            return restructuredData;
        });
    }
    findByID(id_caixa) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Prisma_1.prisma.venda.findMany({
                where: {
                    caixaId_caixa: id_caixa,
                },
            });
            return data;
        });
    }
}
exports.PrismaRepository = PrismaRepository;
