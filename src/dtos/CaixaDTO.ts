import { Caixa } from "@prisma/client";

interface ICreateCaixaDTO {
  saldo: number;
}

interface IUpdateCaixaDTO extends Partial<Caixa> {}

export { ICreateCaixaDTO, IUpdateCaixaDTO };
