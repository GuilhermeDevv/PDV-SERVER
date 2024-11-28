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
exports.CreateCaixaServices = void 0;
const zod_1 = require("zod");
class CreateCaixaServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(saldo) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = zod_1.z.object({
                saldo: zod_1.z.number().positive(),
            });
            const isValid = schema.safeParse({ saldo });
            if (!isValid.success) {
                return {
                    error: true,
                    message: "Saldo inválido",
                    statusCode: 400,
                };
            }
            const data = yield this.repository.create({
                saldo,
            });
            if (data) {
                return {
                    error: false,
                    message: "Caixa aberto",
                    statusCode: 200,
                };
            }
            return {
                error: true,
                message: "Erro ao abrir caixa",
                statusCode: 500,
            };
        });
    }
}
exports.CreateCaixaServices = CreateCaixaServices;
