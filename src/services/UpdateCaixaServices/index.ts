import { z } from "zod";
import { ICaixaRepository } from "../../repository/Caixa/ICaixaRepository";

interface IExecute {
  id: string;
  saldo: number;
}

export class UpdateCaixaServices {
  constructor(private repository: ICaixaRepository) {}

  async execute({ id, saldo }: IExecute) {
    if (!id) {
      return {
        error: true,
        message: "Algo está faltando!",
        statusCode: 400,
      };
    }

    const schema = z.object({
      id: z.string(),
      saldo: z.number(),
    });

    const isValid = schema.safeParse({ id, saldo });

    if (!isValid.success) {
      return {
        error: true,
        message: "Dados inválidos",
        statusCode: 400,
      };
    }

    const data = await this.repository.update(id, {
      status: false,
      data_fechamento: new Date(),
      saldo,
    });

    if (data) {
      return {
        error: false,
        message: "Caixa atualizado",
        statusCode: 200,
      };
    }

    return {
      error: true,
      message: "Erro ao atualizar caixa",
      statusCode: 500,
    };
  }
}
