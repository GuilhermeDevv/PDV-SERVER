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
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, senha }) {
            var _b;
            const data = yield Prisma_1.prisma.funcionario.findFirst({
                where: {
                    nome,
                    senha,
                },
                include: {
                    cargo: true,
                    vendas: {
                        include: {
                            produtos: true,
                        },
                    },
                },
            });
            const dataObj = {
                id_funcionario: data === null || data === void 0 ? void 0 : data.id_funcionario,
                nome: data === null || data === void 0 ? void 0 : data.nome,
                cargo: (_b = data === null || data === void 0 ? void 0 : data.cargo) === null || _b === void 0 ? void 0 : _b.nome,
                infoCargo: data === null || data === void 0 ? void 0 : data.cargo,
                senha: data === null || data === void 0 ? void 0 : data.senha,
                vendas: data === null || data === void 0 ? void 0 : data.vendas,
            };
            return dataObj;
        });
    }
    user(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield Prisma_1.prisma.funcionario.findFirst({
                where: {
                    id_funcionario: userId,
                },
                include: {
                    cargo: true,
                },
            });
            const dataObj = {
                id_funcionario: data === null || data === void 0 ? void 0 : data.id_funcionario,
                nome: data === null || data === void 0 ? void 0 : data.nome,
                cargo: (_a = data === null || data === void 0 ? void 0 : data.cargo) === null || _a === void 0 ? void 0 : _a.nome,
                infoCargo: data === null || data === void 0 ? void 0 : data.cargo,
                senha: data === null || data === void 0 ? void 0 : data.senha,
            };
            return dataObj;
        });
    }
    infoUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Prisma_1.prisma.venda.findMany({
                where: {
                    id_funcionario: userId,
                    data: {
                        gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
                    },
                },
            });
            return data;
        });
    }
}
exports.PrismaRepository = PrismaRepository;
