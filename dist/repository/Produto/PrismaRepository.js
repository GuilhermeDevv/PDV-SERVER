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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRepository = void 0;
const Prisma_1 = require("../../lib/Prisma");
const xlsx_1 = __importDefault(require("xlsx"));
const path_1 = __importDefault(require("path"));
const formatCurrencyBR_1 = require("../../utils/formatCurrencyBR");
class PrismaRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.produto.create({ data });
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.produto.findUnique({ where: { id_produto: id } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.produto.update({ where: { id_produto: id }, data });
        });
    }
    findByAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // caso a porcentagem do estoque em relação à quantidade seja 0 ou menor que 10%, a cor deve ser vermelha
            // caso a porcentagem do estoque em relação à quantidade seja menor ou igual a 50%, a cor deve ser amarela
            // caso a porcentagem do estoque em relação à quantidade seja maior que 50%, a cor deve ser verde
            const produtos = yield Prisma_1.prisma.produto.findMany();
            const produtosFormatted = produtos.map((produto) => {
                let cor;
                const porcentagemEstoque = produto.quantidade <= 0
                    ? 0
                    : (produto.estoque / produto.quantidade) * 100;
                if (porcentagemEstoque <= 0 || porcentagemEstoque < 10) {
                    cor = "#b81d13";
                }
                else if (porcentagemEstoque <= 50) {
                    cor = "#efb700";
                }
                else {
                    cor = "#008450";
                }
                return Object.assign({ cor }, produto);
            });
            return produtosFormatted;
        });
    }
    findByProductForReposition() {
        return __awaiter(this, void 0, void 0, function* () {
            const produtos = yield Prisma_1.prisma.produto.findMany();
            const produtosParaReposicao = produtos.map((produto) => {
                let cor;
                const porcentagemEstoque = produto.quantidade <= 0
                    ? 0
                    : (produto.estoque / produto.quantidade) * 100;
                if (produto.quantidade <= 0 ||
                    porcentagemEstoque <= 0 ||
                    porcentagemEstoque < 10) {
                    cor = "#b81d13";
                }
                else if (porcentagemEstoque <= 50) {
                    cor = "#efb700";
                }
                else {
                    cor = "#008450";
                }
                return Object.assign({ cor }, produto);
            });
            const produtosParaReposicaoCount = produtosParaReposicao.filter((produto) => produto.cor === "#b81d13");
            return produtosParaReposicaoCount;
        });
    }
    findByAllProductsReactSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            const produtos = yield Prisma_1.prisma.produto.findMany();
            console.log(produtos.find((i) => i.desconto > 0), "produto");
            const produtosFormatted = produtos.map((produto) => {
                const price = produto.desconto
                    ? produto.preco * (1 - produto.desconto / 100)
                    : produto.preco;
                return {
                    value: produto.id_produto,
                    label: `${produto.nome} - ${(0, formatCurrencyBR_1.formatCurrency)(price.toString())}`,
                    price,
                };
            });
            return produtosFormatted;
        });
    }
    importXLS() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const filePath = path_1.default.join(__dirname, "..", "..", "dist", "produto1.xls");
            const readExcelFile = (filePath) => {
                const workbook = xlsx_1.default.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx_1.default.utils.sheet_to_json(sheet);
                return data.map((row) => ({
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
                const existingProduct = yield Prisma_1.prisma.produto.findUnique({
                    where: { id_produto: row.id_produto.toString() },
                });
                if (!existingProduct) {
                    // Criar um novo produto
                    yield Prisma_1.prisma.produto.create({
                        data: {
                            nome: row.nome,
                            id_produto: row.id_produto.toString(),
                            preco: row.preco,
                            estoque: (_a = row.estoque) !== null && _a !== void 0 ? _a : 0,
                            custo: row.custo,
                            quantidade: (_b = row.quantidade) !== null && _b !== void 0 ? _b : 0,
                        },
                    });
                }
            }
            console.log("Dados salvos com sucesso!");
        });
    }
}
exports.PrismaRepository = PrismaRepository;
