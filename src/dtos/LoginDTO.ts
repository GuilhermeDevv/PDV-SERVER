export interface IUser {
  id_funcionario: string;
  nome: string;
  cargo: string;
  senha: string;
  vendas: any[];
}

export interface IUserLogin {
  nome: string;
  senha: string;
}
