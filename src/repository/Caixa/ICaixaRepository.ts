import { Caixa, Venda } from "@prisma/client";
import { ICreateCaixaDTO, IUpdateCaixaDTO } from "../../dtos/CaixaDTO";
export interface CaixaComVendas extends Caixa {
  vendas: Venda[];
}
interface ICaixaRepository {
  create(data: ICreateCaixaDTO): Promise<Caixa>;
  findByID(id: string): Promise<Caixa | null>;
  findByAll(): Promise<CaixaComVendas[]>;
  findByOpen(): Promise<Caixa | null>;
  update(id: string, data: IUpdateCaixaDTO): Promise<Caixa>;
}

export { ICaixaRepository };
