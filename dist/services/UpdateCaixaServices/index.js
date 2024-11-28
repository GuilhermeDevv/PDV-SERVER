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
exports.UpdateCaixaServices = void 0;
const zod_1 = require("zod");
class UpdateCaixaServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, saldo }) {
            if (!id) {
                return {
                    error: true,
                    message: "Algo está faltando!",
                    statusCode: 400,
                };
            }
            const schema = zod_1.z.object({
                id: zod_1.z.string(),
                saldo: zod_1.z.number(),
            });
            const isValid = schema.safeParse({ id, saldo });
            if (!isValid.success) {
                return {
                    error: true,
                    message: "Dados inválidos",
                    statusCode: 400,
                };
            }
            const data = yield this.repository.update(id, {
                status: false,
                data_fechamento: new Date(),
                saldo,
                saldo_final: saldo,
            });
            if (data) {
                return {
                    error: false,
                    message: "Caixa atualizado",
                    statusCode: 200,
                };
            }
            return {
                error: true,
                message: "Erro ao atualizar caixa",
                statusCode: 500,
            };
        });
    }
}
exports.UpdateCaixaServices = UpdateCaixaServices;
