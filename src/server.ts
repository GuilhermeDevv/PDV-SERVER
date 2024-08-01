import { app } from "./app";
import { env } from "./env";
import { caixaRouter } from "./http/caixa";
import { dashboardRouter } from "./http/dashboard";
import { productRouter } from "./http/products";
import { saleRouter } from "./http/Sale";

app.use("/caixa", caixaRouter);
app.use("/venda", saleRouter);
app.use("/produto", productRouter);
app.use("/dashboard", dashboardRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
