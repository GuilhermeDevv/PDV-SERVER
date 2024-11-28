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
exports.CreateSaleServices = void 0;
const zod_1 = require("zod");
class CreateSaleServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = zod_1.z.object({
                id_produtos: zod_1.z.array(zod_1.z.string()),
                nome_cliente: zod_1.z.string().optional(),
                total: zod_1.z.string(),
            });
            const isValid = schema.safeParse(data);
            if (!isValid.success) {
                return {
                    error: true,
                    message: "Dados inválidos, verifique os campos",
                    statusCode: 400,
                };
            }
            try {
                yield this.repository.create(data);
                return {
                    error: false,
                    message: "Venda criada com sucesso",
                    statusCode: 200,
                };
            }
            catch (error) {
                const { message } = error;
                console.log(error);
                if (message.includes("Unique constraint failed on the fields: (`id_venda`)")) {
                    return {
                        error: true,
                        message: "ID da venda já existe",
                        statusCode: 400,
                    };
                }
                return {
                    error: true,
                    message: message,
                    statusCode: 500,
                };
            }
        });
    }
}
exports.CreateSaleServices = CreateSaleServices;
