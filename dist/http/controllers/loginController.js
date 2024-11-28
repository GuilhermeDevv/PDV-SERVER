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
const PrismaRepository_1 = require("../../repository/Login/PrismaRepository");
const GetFuncionarioJWTServices_1 = require("../../services/GetFuncionarioJWTServices");
const GetFuncionarioServices_1 = require("../../services/GetFuncionarioServices");
const GetInfoUserServices_1 = require("../../services/GetInfoUserServices");
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getFuncionarioServices = new GetFuncionarioJWTServices_1.GetFuncionarioJWTServices(repository);
            const { data, error, statusCode, message } = yield getFuncionarioServices.execute(req.body);
            res.status(statusCode).json({ data, error, message });
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getFuncionarioServices = new GetFuncionarioServices_1.GetFuncionarioServices(repository);
            const { data, error, statusCode, message } = yield getFuncionarioServices.execute(req.user);
            res.status(statusCode).json({ data, error, message });
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: "Token válido" });
        });
    }
    infoUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new PrismaRepository_1.PrismaRepository();
            const getFuncionarioServices = new GetInfoUserServices_1.GetInfoUserServices(repository);
            const { data, error, statusCode, message } = yield getFuncionarioServices.execute(req.user);
            res.status(statusCode).json({ data, error, message });
        });
    }
}
exports.default = new LoginController();
