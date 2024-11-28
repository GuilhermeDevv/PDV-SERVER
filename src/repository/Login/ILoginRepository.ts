import { Venda } from "@prisma/client";
import { IFuncionario } from "../../dtos/IFuncionario";

export interface ILoginRepository {
  login: ({ nome, senha }: IFuncionario) => Promise<IFuncionario>;
  user: (userId: any) => Promise<IFuncionario>;
  infoUser: (userId: any) => Promise<Venda[]>;
  // logout: () => Promise<void>;
}
