import { z } from "zod";
import { CategoriaProdutoRepository } from "../../repository/CategoriaProduto/CategoriaProdutoRepository";
import { ICreateCategoriaProdutoDTO } from "../../dtos/CategoriaProdutoDTO";

export class CreateCategoriaProdutoService {
  constructor(private repository: CategoriaProdutoRepository) {}

  async execute(data: ICreateCategoriaProdutoDTO) {
    const schema = z.object({
      nome: z.string().nonempty("Nome é obrigatório"),
      iconeCategoria: z.string().nonempty("Ícone é obrigatório"),
      corCategoria: z.string().nonempty("Cor é obrigatória"),
    });

    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      return {
        error: true,
        mensagem: "Dados inválidos, verifique os campos",
        statusCode: 400,
        detalhes: isValid.error.errors,
      };
    }

    const categoriaExistente = await this.repository.findByName(data.nome);

    if (categoriaExistente) {
      return {
        error: true,
        mensagem: "Categoria já existe",
        statusCode: 400,
      };
    }

    try {
      await this.repository.create(data);

      return {
        error: false,
        mensagem: "Categoria criada com sucesso",
        statusCode: 200,
      };
    } catch (error) {
      const { message } = error as Error;

      return {
        error: true,
        mensagem: "Erro ao criar categoria",
        detalhes: message,
        statusCode: 500,
      };
    }
  }
}
