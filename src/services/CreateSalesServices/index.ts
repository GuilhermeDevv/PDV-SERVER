import { z } from "zod";
import { ISaleRepository } from "../../repository/Sale/ISaleRepository";

export class CreateSaleServices {
  constructor(private repository: ISaleRepository) {}
  async execute(data: any) {
    const schema = z.object({
      id_produtos: z.array(z.string()),
      nome_cliente: z.string().optional(),
      total: z.string(),
    });

    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      return {
        error: true,
        message: "Dados inválidos, verifique os campos",
        statusCode: 400,
      };
    }

    try {
      await this.repository.create(data);

      return {
        error: false,
        message: "Venda criada com sucesso",
        statusCode: 200,
      };
    } catch (error) {
      const { message } = error as Error;
      console.log(error);
      if (
        message.includes("Unique constraint failed on the fields: (`id_venda`)")
      ) {
        return {
          error: true,
          message: "ID da venda já existe",
          statusCode: 400,
        };
      }

      return {
        error: true,
        message: message,
        statusCode: 500,
      };
    }
  }
}
