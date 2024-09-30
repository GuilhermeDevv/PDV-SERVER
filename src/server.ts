import { app } from "./app";
import { env } from "./env";
import { caixaRouter } from "./http/caixa";
import { dashboardRouter } from "./http/dashboard";
import { productRouter } from "./http/products";
import { saleRouter } from "./http/Sale";
import { loginRouter } from "./http/login";
import { userRouter } from "./http/user";
import jwt from "jsonwebtoken";

import { Response, Request, NextFunction } from "express";

export const SECRET_KEY = "@#%$^&*()_+";

export interface ICustomRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Token não informado" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
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

app.use("/caixa", authenticateToken, caixaRouter);
app.use("/venda", authenticateToken, saleRouter);
app.use("/produto", authenticateToken, productRouter);
app.use("/dashboard", authenticateToken, dashboardRouter);
app.use("/user", authenticateToken, userRouter);
app.use("/auth", authenticateToken, loginRouter);
app.use("/login", loginRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
