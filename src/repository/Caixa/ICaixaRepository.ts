import { Caixa } from "@prisma/client";
import { ICreateCaixaDTO, IUpdateCaixaDTO } from "../../dtos/CaixaDTO";

interface ICaixaRepository {
  create(data: ICreateCaixaDTO): Promise<Caixa>;
  findByID(id: string): Promise<Caixa | null>;
  findByAll(): Promise<Caixa[]>;
  findByOpen(): Promise<Caixa | null>;
  update(id: string, data: IUpdateCaixaDTO): Promise<Caixa>;
}

export { ICaixaRepository };
