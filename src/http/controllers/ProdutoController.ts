import { Request, Response } from "express";
import { PrismaRepository } from "../../repository/Produto/PrismaRepository";
import { GetProdutoServices } from "../../services/GetProdutoServices";
import { GetProdutoReactSelect } from "../../services/GetProdutoReactSelect";
import { CreateProductServices } from "../../services/CreateProductServices";
import { UpdateProductServices } from "../../services/UpdadeProductServices";

class ProductController {
  async getAllProducts(_req: Request, res: Response) {
    const repository = new PrismaRepository();
    const getProdutoServices = new GetProdutoServices(repository);
    const { data, error, statusCode } = await getProdutoServices.execute();

    res.status(statusCode).json({ data, error });
  }

  async createProduct(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const createProdutoServices = new CreateProductServices(repository);
    const { mensagem, error, statusCode } = await createProdutoServices.execute(
      req.body
    );

    res.status(statusCode).json({ mensagem, error });
  }

  async updateProduct(req: Request, res: Response) {
    const repository = new PrismaRepository();
    const updateProdutoServices = new UpdateProductServices(repository);
    const { message, error, statusCode } = await updateProdutoServices.execute({
      ...req.body,
      ...req.params,
    });
    res.status(statusCode).json({ message, error });
  }

  async getProductReactSelect(_req: Request, res: Response) {
    const repository = new PrismaRepository();
    const getProdutoReactSelect = new GetProdutoReactSelect(repository);
    const { data, error, statusCode } = await getProdutoReactSelect.execute();

    res.status(statusCode).json({ data, error });
  }

  async importXLS(_req: Request, res: Response) {
    const repository = new PrismaRepository();
    await repository.importXLS();

    res.status(200);
  }

  async findByProductForReposition(_req: Request, res: Response) {
    const repository = new PrismaRepository();
    const produtosParaReposicao = await repository.findByProductForReposition();

    res.status(200).json(produtosParaReposicao);
  }
}
export default new ProductController();
