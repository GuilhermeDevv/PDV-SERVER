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
const PrismaRepository_1 = require("../../repository/Caixa/PrismaRepository");
const PrismaRepository_2 = require("../../repository/Sale/PrismaRepository");
const CreateCaixaServices_1 = require("../../services/CreateCaixaServices");
const GetCaixaServices_1 = require("../../services/GetCaixaServices");
const GetSaleServices_1 = require("../../services/GetSaleServices");
const UpdateCaixaServices_1 = require("../../services/UpdateCaixaServices");
class CaixaController {
    createCaixa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { saldo } = req.body;
            const repository = new PrismaRepository_1.PrismaRepository();
            const createCaixaServices = new CreateCaixaServices_1.CreateCaixaServices(repository);
            const { message, error, statusCode } = yield createCaixaServices.execute(saldo);
            res.status(statusCode).json({ message, error });
        });
    }
    getAllCaixa(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getCaixaServices = new GetCaixaServices_1.GetCaixaServices(repository);
            const { data, open, error, statusCode } = yield getCaixaServices.execute();
            res.status(statusCode).json({ data, open, error });
        });
    }
    closeCaixa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const repository = new PrismaRepository_1.PrismaRepository();
            const updateCaixaServices = new UpdateCaixaServices_1.UpdateCaixaServices(repository);
            const repositorySale = new PrismaRepository_2.PrismaRepository();
            const getSaleServices = new GetSaleServices_1.GetProdutoServices(repositorySale);
            const openCaixa = yield repository.findByOpen();
            if (!openCaixa) {
                return res
                    .status(404)
                    .json({ message: "Nenhum caixa aberto encontrado", error: true });
            }
            const { data } = yield getSaleServices.execute(openCaixa.id_caixa);
            const totalVendas = (_a = data === null || data === void 0 ? void 0 : data.reduce((acc, sale) => acc + sale.total, 0)) !== null && _a !== void 0 ? _a : 0;
            // Adicionar o valor inicial ao saldo final
            const saldoFinal = openCaixa.saldo + totalVendas;
            const { message, error, statusCode } = yield updateCaixaServices.execute({
                id: openCaixa.id_caixa,
                saldo: saldoFinal,
            });
            res.status(statusCode).json({ message, error });
        });
    }
}
exports.default = new CaixaController();
