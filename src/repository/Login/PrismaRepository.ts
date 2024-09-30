import { IFuncionario } from "../../dtos/IFuncionario";
import { prisma } from "../../lib/Prisma";

export class PrismaRepository {
  async login({ nome, senha }: IFuncionario) {
    const data = await prisma.funcionario.findFirst({
      where: {
        nome,
        senha,
      },
    });

    return data;
  }

  async user(userId: any) {
    const data = await prisma.funcionario.findFirst({
      where: {
        id_funcionario: userId,
      },
    });

    return data;
  }
}
