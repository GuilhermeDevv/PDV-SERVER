import { IFuncionario } from "../../dtos/IFuncionario";
import { prisma } from "../../lib/Prisma";

export class PrismaRepository {
  async login({ nome, senha }: IFuncionario) {
    const data = await prisma.funcionario.findFirst({
      where: {
        nome,
        senha,
      },
      include: {
        cargo: true,
        vendas: {
          include: {
            produtos: true,
          },
        },
      },
    });

    const dataObj = {
      id_funcionario: data?.id_funcionario!,
      nome: data?.nome!,
      cargo: data?.cargo?.nome!,
      infoCargo: data?.cargo!,
      senha: data?.senha!,
      vendas: data?.vendas!,
    };
    return dataObj;
  }

  async user(userId: any) {
    const data = await prisma.funcionario.findFirst({
      where: {
        id_funcionario: userId,
      },
      include: {
        cargo: true,
      },
    });
    const dataObj = {
      id_funcionario: data?.id_funcionario!,
      nome: data?.nome!,
      cargo: data?.cargo?.nome!,
      infoCargo: data?.cargo!,
      senha: data?.senha!,
    };
    return dataObj;
  }

  async infoUser(userId: any) {
    const data = await prisma.venda.findMany({
      where: {
        id_funcionario: userId,
        data: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
      },
    });
    return data;
  }
}
