import { Venda } from "@prisma/client";
import { ICreateVendaDTO, IUpdateVendaDTO } from "../../dtos/VendaDTO";

export interface ISaleRepository {
  create(data: ICreateVendaDTO): Promise<Venda>;
  findByID(id: string): Promise<Venda[] | null>;
  findByAll(): Promise<Venda[]>;
  // update(id: string, data: IUpdateVendaDTO): Promise<Venda>;
}
