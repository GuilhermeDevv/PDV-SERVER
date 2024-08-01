import { z } from "zod";
import { IProdutoRepository } from "../../repository/Produto/IProductRepository";

export class CreateProductServices {
  constructor(private repository: IProdutoRepository) {}
  async execute(data: any) {
    const schema = z.object({
      id_produto: z.string().optional(),
      nome: z.string(),
      preco: z.number().positive(),
      quantidade: z.number().positive(),
      estoque: z.number().positive(),
      custo: z.number().positive(),
      descricao: z.string(),
    });

    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      return {
        error: true,
        mensagem: "Dados inválidos, verifique os campos",
        statusCode: 400,
      };
    }

    try {
      await this.repository.create(data);

      return {
        error: false,
        mensagem: "Produto criado com sucesso",
        statusCode: 200,
      };
    } catch (error) {
      const { message } = error as Error;

      if (
        message.includes(
          "Unique constraint failed on the fields: (`id_produto`)"
        )
      ) {
        return {
          error: true,
          mensagem: "ID do produto já existe",
          statusCode: 400,
        };
      }

      return {
        error: true,
        mensagem: message,
        statusCode: 500,
      };
    }
  }
}
