export interface IFuncionario {
  id_funcionario: string;
  nome: string;
  cargo: string;
  infoCargo: {
    id_cargo: number;
    nome: string;
    nivel_acesso: string;
    createdAt: Date;
  };
  senha: string;
}
