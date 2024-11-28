import { Router } from "express";

import ProductController from "../controllers/ProdutoController";
import CategoriaProdutoController from "../controllers/CategoriaProdutoController";

const router = Router();

router.get("/", ProductController.getAllProducts);

router.get("/react-select", ProductController.getProductReactSelect);

router.post("/", ProductController.createProduct);

router.put("/:id", ProductController.updateProduct);

router.get("/reposition", ProductController.findByProductForReposition);

router.post("/categoria", CategoriaProdutoController.createCategoriaProduto);
router.get("/categorias", CategoriaProdutoController.getAllCategorias);

export { router as productRouter };
