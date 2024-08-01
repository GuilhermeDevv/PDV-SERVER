import { IProdutoRepository } from "../../repository/Produto/IProductRepository";

export class GetProdutoReactSelect {
  constructor(private repository: IProdutoRepository) {}

  async execute() {
    const data = await this.repository.findByAllProductsReactSelect();

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
