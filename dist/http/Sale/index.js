"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleRouter = void 0;
const express_1 = require("express");
const SaleController_1 = __importDefault(require("../controllers/SaleController"));
const router = (0, express_1.Router)();
exports.saleRouter = router;
router.post("/", SaleController_1.default.create);
router.get("/", SaleController_1.default.getAllSales);
