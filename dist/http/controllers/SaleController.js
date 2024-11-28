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
const PrismaRepository_1 = require("../../repository/Sale/PrismaRepository");
const CreateSalesServices_1 = require("../../services/CreateSalesServices");
class SaleController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const createSaleServices = new CreateSalesServices_1.CreateSaleServices(repository);
            const { message, error, statusCode } = yield createSaleServices.execute(Object.assign(Object.assign({}, req.body), { id_funcionario: req.user.userId }));
            res.status(statusCode).json({ message, error });
        });
    }
    getAllSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const sales = yield repository.findByAll();
            return res.json(sales);
        });
    }
}
exports.default = new SaleController();
