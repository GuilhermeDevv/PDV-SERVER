import { Router } from "express";

import ProductController from "../controllers/ProdutoController";

const router = Router();

router.get("/", ProductController.getAllProducts);

router.get("/react-select", ProductController.getProductReactSelect);

router.post("/", ProductController.createProduct);

router.put("/:id", ProductController.updateProduct);

router.get("/reposition", ProductController.findByProductForReposition);

router.get("/import", ProductController.importXLS);

export { router as productRouter };
