import { SECRET_KEY } from "../../server";
import { IFuncionario } from "../../dtos/IFuncionario";
import { ILoginRepository } from "../../repository/Login/ILoginRepository";
import jwt from "jsonwebtoken";

type loginParamsProps = {
  login: string;
  password: string;
};
export class GetFuncionarioJWTServices {
  constructor(private repository: ILoginRepository) {}

  async execute({ login, password }: loginParamsProps) {
    const data = await this.repository.login({
      nome: login,
      senha: password,
    } as unknown as IFuncionario);

    if (!data.id_funcionario) {
      return {
        error: true,
        message: "Funcionário não encontrado",
        data,
        statusCode: 404,
      };
    }

    if (data.id_funcionario) {
      const token = jwt.sign({ userId: data.id_funcionario }, SECRET_KEY, {
        expiresIn: "11h",
      });

      return {
        error: false,
        message: "Funcionário encontrado",
        data: token,
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
