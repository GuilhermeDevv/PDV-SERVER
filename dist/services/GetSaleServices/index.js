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
exports.GetProdutoServices = void 0;
class GetProdutoServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id_caixa) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.findByID(id_caixa);
            if (data) {
                return {
                    error: false,
                    data,
                    statusCode: 200,
                };
            }
            return {
                error: true,
                message: "Erro ao buscar produtos",
                statusCode: 500,
            };
        });
    }
}
exports.GetProdutoServices = GetProdutoServices;
