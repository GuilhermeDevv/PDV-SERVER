import { Router } from "express";

import CaixaController from "../controllers/CaixaController";

const router = Router();

router.get("/", CaixaController.getAllCaixa);

router.post("/", CaixaController.createCaixa);

router.put("/", CaixaController.closeCaixa);

export { router as caixaRouter };
