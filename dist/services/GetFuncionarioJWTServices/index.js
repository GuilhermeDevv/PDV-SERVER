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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFuncionarioJWTServices = void 0;
const server_1 = require("../../server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GetFuncionarioJWTServices {
    constructor(repository) {
        this.repository = repository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ login, password }) {
            const data = yield this.repository.login({
                nome: login,
                senha: password,
            });
            if (!data) {
                return {
                    error: true,
                    message: "Funcionário não encontrado",
                    data,
                    statusCode: 404,
                };
            }
            if (data) {
                const token = jsonwebtoken_1.default.sign({ userId: data.id_funcionario }, server_1.SECRET_KEY, {
                    expiresIn: "11h",
                });
                return {
                    error: false,
                    message: "Funcionário encontrado",
                    data: token,
                    statusCode: 200,
                };
            }
            return {
                error: true,
                message: "Erro ao buscar funcionário",
                data,
                statusCode: 500,
            };
        });
    }
}
exports.GetFuncionarioJWTServices = GetFuncionarioJWTServices;
