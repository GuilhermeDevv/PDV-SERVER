import { z } from "zod";

import { ICaixaRepository } from "../../repository/Caixa/ICaixaRepository";

export class CreateCaixaServices {
  constructor(private repository: ICaixaRepository) { }
  async execute(saldo: number) {
    const schema = z.object({
      saldo: z.number().positive(),
    });

    const isValid = schema.safeParse({ saldo });

    if (!isValid.success) {
      return {
        error: true,
        message: "Saldo inválido",
        statusCode: 400,
      };
    }

    const data = await this.repository.create({
      saldo,
    });

    if (data) {
      return {
        error: false,
        message: "Caixa aberto",
        statusCode: 200,
      };
    }

    return {
      error: true,
      message: "Erro ao abrir caixa",
      statusCode: 500,
    };
  }
}
