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
const PrismaRepository_1 = require("../../repository/Dashbord/PrismaRepository");
class DashboardController {
    getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const quantityInfo = yield repository.getQuantityInfo(req.user.userId);
            const salesProfit = yield repository.getSalesProfit(req.user.userId);
            const salesValue = yield repository.getSalesValue(req.user.userId);
            const salesQuantity = yield repository.getSalesCount(req.user.userId);
            res.status(200).json({
                quantityInfo,
                salesProfit,
                salesValue,
                salesQuantity,
            });
        });
    }
}
exports.default = new DashboardController();
