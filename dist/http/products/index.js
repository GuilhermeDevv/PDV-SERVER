"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProdutoController_1 = __importDefault(require("../controllers/ProdutoController"));
const router = (0, express_1.Router)();
exports.productRouter = router;
router.get("/", ProdutoController_1.default.getAllProducts);
router.get("/react-select", ProdutoController_1.default.getProductReactSelect);
router.post("/", ProdutoController_1.default.createProduct);
router.put("/:id", ProdutoController_1.default.updateProduct);
router.get("/reposition", ProdutoController_1.default.findByProductForReposition);
router.get("/import", ProdutoController_1.default.importXLS);
