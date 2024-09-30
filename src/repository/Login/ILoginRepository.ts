import { IFuncionario } from "../../dtos/IFuncionario";

export interface ILoginRepository {
  login: ({ nome, senha }: IFuncionario) => Promise<IFuncionario | null>;
  user: (userId: any) => Promise<IFuncionario | null>;
  // logout: () => Promise<void>;
}
