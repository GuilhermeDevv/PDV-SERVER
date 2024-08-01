import { IProdutoRepository } from "../../repository/Produto/IProductRepository";

export class GetProdutoServices {
  constructor(private repository: IProdutoRepository) {}

  async execute() {
    const data = await this.repository.findByAll();

    if (data) {
      return {
        error: false,
        data,
        statusCode: 200,
      };
    }

    return {
      error: true,
      message: "Erro ao buscar produtos",
      statusCode: 500,
    };
  }
}
