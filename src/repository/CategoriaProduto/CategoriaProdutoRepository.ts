import { PrismaClient } from "@prisma/client";
import { ICreateCategoriaProdutoDTO } from "../../dtos/CategoriaProdutoDTO";

const prisma = new PrismaClient();

export class CategoriaProdutoRepository {
  async create(data: ICreateCategoriaProdutoDTO) {
    return await prisma.categoriaProduto.create({ data });
  }

  async findByName(nome: string) {
    return await prisma.categoriaProduto.findUnique({
      where: { nome },
    });
  }

  async findAll() {
    return await prisma.categoriaProduto.findMany();
  }
}
