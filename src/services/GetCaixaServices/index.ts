import { ICaixaRepository } from "../../repository/Caixa/ICaixaRepository";

export class GetCaixaServices {
  constructor(private repository: ICaixaRepository) {}

  async execute() {
    const data = await this.repository.findByAll();

    if (data) {
      return {
        error: false,
        data,
        open: data.some((caixa) => caixa.status),
        statusCode: 200,
      };
    }

    return {
      error: true,
      message: "Erro ao buscar caixa",
      statusCode: 500,
    };
  }
}
