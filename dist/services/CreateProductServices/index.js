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
exports.CreateProductServices = void 0;
const zod_1 = require("zod");
class CreateProductServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = zod_1.z.object({
                id_produto: zod_1.z.string().optional(),
                nome: zod_1.z.string(),
                preco: zod_1.z.number().positive(),
                quantidade: zod_1.z.number().positive(),
                estoque: zod_1.z.number().positive(),
                custo: zod_1.z.number().positive(),
                descricao: zod_1.z.string(),
            });
            const isValid = schema.safeParse(data);
            if (!isValid.success) {
                return {
                    error: true,
                    mensagem: "Dados inválidos, verifique os campos",
                    statusCode: 400,
                };
            }
            try {
                yield this.repository.create(data);
                return {
                    error: false,
                    mensagem: "Produto criado com sucesso",
                    statusCode: 200,
                };
            }
            catch (error) {
                const { message } = error;
                if (message.includes("Unique constraint failed on the fields: (`id_produto`)")) {
                    return {
                        error: true,
                        mensagem: "ID do produto já existe",
                        statusCode: 400,
                    };
                }
                return {
                    error: true,
                    mensagem: message,
                    statusCode: 500,
                };
            }
        });
    }
}
exports.CreateProductServices = CreateProductServices;
