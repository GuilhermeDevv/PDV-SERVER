import { ISaleRepository } from "../../repository/Sale/ISaleRepository";

export class GetProdutoServices {
  constructor(private repository: ISaleRepository) {}

  async execute(id_caixa: string) {
    const data = await this.repository.findByID(id_caixa);

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
