import { Request, Response } from "express";
import { CategoriaProdutoRepository } from "../../repository/CategoriaProduto/CategoriaProdutoRepository";
import { CreateCategoriaProdutoService } from "../../services/CreateProductCategoryServices";

class CategoriaProdutoController {
  async createCategoriaProduto(req: Request, res: Response) {
    const repository = new CategoriaProdutoRepository();
    const createCategoriaProdutoService = new CreateCategoriaProdutoService(
      repository
    );
    const { mensagem, error, statusCode } =
      await createCategoriaProdutoService.execute(req.body);

    res.status(statusCode).json({ mensagem, error });
  }

  async getAllCategorias(_req: Request, res: Response) {
    const repository = new CategoriaProdutoRepository();
    const categorias = await repository.findAll();

    res.status(200).json(categorias);
  }
}

export default new CategoriaProdutoController();
