import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Caixa/PrismaRepository";
import { PrismaRepository as PrismaRepositorySale } from "../../repository/Sale/PrismaRepository";
import { CreateCaixaServices } from "../../services/CreateCaixaServices";
import { GetCaixaServices } from "../../services/GetCaixaServices";
import { GetProdutoServices } from "../../services/GetSaleServices";
import { UpdateCaixaServices } from "../../services/UpdateCaixaServices";

class CaixaController {
  async createCaixa(req: Request, res: Response) {
    const { saldo } = req.body;

    const repository = new PrismaRepository();
    const createCaixaServices = new CreateCaixaServices(repository);
    const { message, error, statusCode } = await createCaixaServices.execute(
      saldo
    );

    res.status(statusCode).json({ message, error });
  }

  async getAllCaixa(_req: Request, res: Response) {
    const repository = new PrismaRepository();

    const getCaixaServices = new GetCaixaServices(repository);
    const { data, open, error, statusCode } = await getCaixaServices.execute();

    res.status(statusCode).json({ data, open, error });
  }

  async closeCaixa(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const updateCaixaServices = new UpdateCaixaServices(repository);

    const repositorySale = new PrismaRepositorySale();
    const getSaleServices = new GetProdutoServices(repositorySale);

    const openCaixa = await repository.findByOpen();
    if (!openCaixa) {
      return res
        .status(404)
        .json({ message: "Nenhum caixa aberto encontrado", error: true });
    }

    const { data } = await getSaleServices.execute(
      openCaixa.id_caixa as string
    );
    const totalVendas = data?.reduce((acc, sale) => acc + sale.total, 0) ?? 0;

    // Adicionar o valor inicial ao saldo final
    const saldoFinal = openCaixa.saldo + totalVendas;

    const { message, error, statusCode } = await updateCaixaServices.execute({
      id: openCaixa.id_caixa as string,
      saldo: saldoFinal,
    });

    res.status(statusCode).json({ message, error });
  }
}

export default new CaixaController();


