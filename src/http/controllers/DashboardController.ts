import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Dashbord/PrismaRepository";

class DashboardController {
  async getDashboardData(_req: Request, res: Response) {
    const repository = new PrismaRepository();
    const quantityInfo = await repository.getQuantityInfo();

    const salesValue = await repository.getSalesValue();
    const salesQuantity = await repository.getSalesCount();
    res.status(200).json({
      quantityInfo,
      salesValue,
      salesQuantity,
    });
  }
}

export default new DashboardController();
