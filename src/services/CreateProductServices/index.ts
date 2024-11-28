import { z } from "zod";
import { IProdutoRepository } from "../../repository/Produto/IProductRepository";

export class CreateProductServices {
  constructor(private repository: IProdutoRepository) {}

  async execute(data: any) {
    console.log(data, "request");
    const schema = z.object({
      nome: z.string().nonempty("Nome é obrigatório"),
      preco: z.number().positive("Preço deve ser um número positivo"),
      quantidade: z.number().positive("Quantidade deve ser um número positivo"),
      estoque: z.number().positive("Estoque deve ser um número positivo"),
      custo: z.number().positive("Custo deve ser um número positivo"),
      descricao: z.string().nonempty("Descrição é obrigatória"),
      fornecedor: z.string().default("SEM INFORMAÇÃO"),
      categoriaId: z.number().positive("Categoria é obrigatória"),
      url: z.string().nonempty("URL da imagem é obrigatória"),
    });

    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      console.log(isValid.error.errors);
      return {
        error: true,
        mensagem: "Dados inválidos, verifique os campos",
        statusCode: 400,
        detalhes: isValid.error.errors,
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
        mensagem: "Erro ao criar produto",
        detalhes: message,
        statusCode: 500,
      };
    }
  }
}
