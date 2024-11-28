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
exports.UpdateProductServices = void 0;
const zod_1 = require("zod");
class UpdateProductServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, nome, preco, quantidade, custo, estoque, descricao, isOnline, desconto, }) {
            const schema = zod_1.z
                .object({
                id: zod_1.z.string(),
                nome: zod_1.z.string(),
                preco: zod_1.z.number(),
                quantidade: zod_1.z.number(),
                custo: zod_1.z.number(),
                estoque: zod_1.z.number(),
                descricao: zod_1.z.string(),
                isOnline: zod_1.z.boolean(),
                desconto: zod_1.z.number(),
            })
                .partial({
                id: true,
                nome: true,
                preco: true,
                quantidade: true,
                custo: true,
                estoque: true,
                descricao: true,
                isOnline: true,
                desconto: true,
            });
            const isValid = schema.safeParse({
                id,
                nome,
                preco,
                quantidade,
                custo,
                estoque,
                descricao,
                isOnline,
            });
            if (!isValid.success) {
                return {
                    error: true,
                    message: "Dados inválidos",
                    statusCode: 400,
                };
            }
            try {
                const data = yield this.repository.update(id, {
                    nome,
                    preco,
                    quantidade,
                    custo,
                    estoque,
                    descricao,
                    isOnline,
                    desconto,
                });
                if (data) {
                    return {
                        error: false,
                        message: "Produto atualizado",
                        statusCode: 200,
                    };
                }
            }
            catch (error) {
                return {
                    error: true,
                    message: "Erro ao atualizar produto",
                    statusCode: 500,
                };
            }
            return {
                error: true,
                message: "Erro ao atualizar produto",
                statusCode: 500,
            };
        });
    }
}
exports.UpdateProductServices = UpdateProductServices;
