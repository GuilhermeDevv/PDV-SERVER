import { Router } from "express";

import SaleController from "../controllers/SaleController";

const router = Router();

router.post("/", SaleController.create);
router.get("/", SaleController.getAllSales);

export { router as saleRouter };
