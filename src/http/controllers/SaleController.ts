import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Sale/PrismaRepository";
import { CreateSaleServices } from "../../services/CreateSalesServices";

class SaleController {
  async create(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const createSaleServices = new CreateSaleServices(repository);
    const { message, error, statusCode } = await createSaleServices.execute(
      req.body
    );

    res.status(statusCode).json({ message, error });
  }

  async getAllSales(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const sales = await repository.findByAll();

    return res.json(sales);
  }
}

export default new SaleController();
