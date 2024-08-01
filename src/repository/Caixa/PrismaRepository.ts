import { prisma } from "../../lib/Prisma";

import { ICaixaRepository } from "./ICaixaRepository";
import { ICreateCaixaDTO, IUpdateCaixaDTO } from "../../dtos/CaixaDTO";

export class PrismaRepository implements ICaixaRepository {
  async create(data: ICreateCaixaDTO) {
    return await prisma.caixa.create({ data });
  }

  async findByID(id: string) {
    return await prisma.caixa.findUnique({ where: { id_caixa: id } });
  }

  async update(id: string, data: IUpdateCaixaDTO) {
    return await prisma.caixa.update({ where: { id_caixa: id }, data });
  }

  async findByAll() {
    return await prisma.caixa.findMany({
      orderBy: {
        data_abertura: "desc",
      },
    });
  }

  async findByOpen() {
    return await prisma.caixa.findFirst({
      where: {
        status: true,
      },
    });
  }
}
