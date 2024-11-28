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
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.caixa.create({
                data: {
                    saldo: 0,
                    saldo_inicial: data.saldo,
                    saldo_final: data.saldo,
                },
            });
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.caixa.findUnique({ where: { id_caixa: id } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.caixa.update({ where: { id_caixa: id }, data });
        });
    }
    findByAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.caixa.findMany({
                orderBy: {
                    data_abertura: "desc",
                },
                include: {
                    vendas: true,
                },
            });
        });
    }
    findByOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prisma_1.prisma.caixa.findFirst({
                where: {
                    status: true,
                },
            });
        });
    }
}
exports.PrismaRepository = PrismaRepository;
