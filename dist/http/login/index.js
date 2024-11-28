"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
const router = (0, express_1.Router)();
exports.loginRouter = router;
router.post("/", loginController_1.default.login);
router.get("/", loginController_1.default.auth);
