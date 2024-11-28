import { z } from "zod";
import { IProdutoRepository } from "../../repository/Produto/IProductRepository";

interface IExecute {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  custo: number;
  estoque: number;
  descricao: string;
  isOnline: boolean;
  desconto: number;
}

export class UpdateProductServices {
  constructor(private repository: IProdutoRepository) {}

  async execute({
    id,
    nome,
    preco,
    quantidade,
    custo,
    estoque,
    descricao,
    isOnline,
    desconto,
  }: IExecute) {
    const schema = z
      .object({
        id: z.string(),
        nome: z.string(),
        preco: z.number(),
        quantidade: z.number(),
        custo: z.number(),
        estoque: z.number(),
        descricao: z.string(),
        isOnline: z.boolean(),
        desconto: z.number(),
      })
      .partial({
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        custo: true,
        estoque: true,
        descricao: true,
        isOnline: true,
        desconto: true,
      });

    const isValid = schema.safeParse({
      id,
      nome,
      preco,
      quantidade,
      custo,
      estoque,
      descricao,
      isOnline,
    });

    if (!isValid.success) {
      return {
        error: true,
        message: "Dados inválidos",
        statusCode: 400,
      };
    }
    try {
      const data = await this.repository.update(id, {
        nome,
        preco,
        quantidade,
        custo,
        estoque,
        descricao,
        isOnline,
        desconto,
      });

      if (data) {
        return {
          error: false,
          message: "Produto atualizado",
          statusCode: 200,
        };
      }
    } catch (error) {
      return {
        error: true,
        message: "Erro ao atualizar produto",
        statusCode: 500,
      };
    }

    return {
      error: true,
      message: "Erro ao atualizar produto",
      statusCode: 500,
    };
  }
}
