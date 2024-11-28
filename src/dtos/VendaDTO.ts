import { Venda } from "@prisma/client";

export interface ICreateVendaDTO {
  id_venda: string;
  id_funcionario: string;
  total: string;
  id_caixa: string;
  id_produtos: string[];
  nome_cliente?: string;
  valores: Record<string, number>;
}
export interface IUpdateVendaDTO extends Partial<Venda> {}
export interface IDeleteVendaDTO {
  id_venda: string;
}
