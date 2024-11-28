import { IFuncionario } from "../../dtos/IFuncionario";
import { ILoginRepository } from "../../repository/Login/ILoginRepository";

export class GetFuncionarioServices {
  constructor(private repository: ILoginRepository) {}

  async execute(user: any) {
    const id = user.userId;
    if (!id) {
      return {
        error: true,
        message: "Erro ao buscar funcionário",
        data: null,
        statusCode: 500,
      };
    }
    const data = await this.repository.user(id);

    if (!data) {
      return {
        error: true,
        message: "Funcionário não encontrado",
        data,
        statusCode: 404,
      };
    }

    if (data) {
      return {
        error: false,
        message: "Funcionário encontrado",
        data: data,
        statusCode: 200,
      };
    }

    return {
      error: true,
      message: "Erro ao buscar funcionário",
      data,
      statusCode: 500,
    };
  }
}
