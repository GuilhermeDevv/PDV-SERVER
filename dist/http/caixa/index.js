"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caixaRouter = void 0;
const express_1 = require("express");
const CaixaController_1 = __importDefault(require("../controllers/CaixaController"));
const router = (0, express_1.Router)();
exports.caixaRouter = router;
router.get("/", CaixaController_1.default.getAllCaixa);
router.post("/", CaixaController_1.default.createCaixa);
router.put("/", CaixaController_1.default.closeCaixa);
