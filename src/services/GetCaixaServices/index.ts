import { ICaixaRepository } from "../../repository/Caixa/ICaixaRepository";

export class GetCaixaServices {
  constructor(private repository: ICaixaRepository) {}

  async execute() {
    const data = await this.repository.findByAll();

    if (data) {
      const caixa = data.map((caixa) => {
        const vendas_parcial = caixa.vendas.reduce((acc, venda) => {
          return acc + venda.total;
        }, 0);
        const saldo_final = caixa.saldo_inicial + vendas_parcial;
        const { vendas, ...caixaSemVendas } = caixa;
        return {
          ...caixaSemVendas,
          vendas_parcial,
          saldo_final,
        };
      });

      return {
        error: false,
        data: caixa,
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
