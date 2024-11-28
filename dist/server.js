"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.SECRET_KEY = void 0;
const app_1 = require("./app");
const env_1 = require("./env");
const caixa_1 = require("./http/caixa");
const dashboard_1 = require("./http/dashboard");
const products_1 = require("./http/products");
const Sale_1 = require("./http/Sale");
const login_1 = require("./http/login");
const user_1 = require("./http/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = "@#%$^&*()_+";
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({ message: "Token não informado" });
    jsonwebtoken_1.default.verify(token, exports.SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Token expirado" });
            }
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
app_1.app.use("/caixa", exports.authenticateToken, caixa_1.caixaRouter);
app_1.app.use("/venda", exports.authenticateToken, Sale_1.saleRouter);
app_1.app.use("/produto", exports.authenticateToken, products_1.productRouter);
app_1.app.use("/dashboard", exports.authenticateToken, dashboard_1.dashboardRouter);
app_1.app.use("/user", exports.authenticateToken, user_1.userRouter);
app_1.app.use("/auth", exports.authenticateToken, login_1.loginRouter);
app_1.app.use("/login", login_1.loginRouter);
app_1.app.listen(env_1.env.PORT, () => {
    console.log(`Server is running on http://localhost:${env_1.env.PORT}`);
});
