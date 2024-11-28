import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Dashbord/PrismaRepository";
import { ICustomRequest } from "../../server";
class DashboardController {
  async getDashboardData(req: ICustomRequest, res: Response) {
    const repository = new PrismaRepository();

    const quantityInfo = await repository.getQuantityInfo(req.user.userId);
    const salesProfit = await repository.getSalesProfit(req.user.userId);
    const salesValue = await repository.getSalesValue(req.user.userId);
    const salesQuantity = await repository.getSalesCount(req.user.userId);
    res.status(200).json({
      quantityInfo,
      salesProfit,
      salesValue,
      salesQuantity,
    });
  }
}

export default new DashboardController();
