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
const PrismaRepository_1 = require("../../repository/Produto/PrismaRepository");
const GetProdutoServices_1 = require("../../services/GetProdutoServices");
const GetProdutoReactSelect_1 = require("../../services/GetProdutoReactSelect");
const CreateProductServices_1 = require("../../services/CreateProductServices");
const UpdadeProductServices_1 = require("../../services/UpdadeProductServices");
class ProductController {
    getAllProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getProdutoServices = new GetProdutoServices_1.GetProdutoServices(repository);
            const { data, error, statusCode } = yield getProdutoServices.execute();
            res.status(statusCode).json({ data, error });
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const createProdutoServices = new CreateProductServices_1.CreateProductServices(repository);
            const { mensagem, error, statusCode } = yield createProdutoServices.execute(req.body);
            res.status(statusCode).json({ mensagem, error });
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const updateProdutoServices = new UpdadeProductServices_1.UpdateProductServices(repository);
            const { message, error, statusCode } = yield updateProdutoServices.execute(Object.assign(Object.assign({}, req.body), req.params));
            res.status(statusCode).json({ message, error });
        });
    }
    getProductReactSelect(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getProdutoReactSelect = new GetProdutoReactSelect_1.GetProdutoReactSelect(repository);
            const { data, error, statusCode } = yield getProdutoReactSelect.execute();
            res.status(statusCode).json({ data, error });
        });
    }
    importXLS(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            yield repository.importXLS();
            res.status(200);
        });
    }
    findByProductForReposition(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const produtosParaReposicao = yield repository.findByProductForReposition();
            res.status(200).json(produtosParaReposicao);
        });
    }
}
exports.default = new ProductController();
