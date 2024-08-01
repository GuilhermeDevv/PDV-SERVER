export interface ICaixa {
  id: number;
  status: string;
  abertura: string;
  fechamento: string | null;
  "valor Inicial": number;
  "valor Final": number | null;
  funcionario: string;
  vendas: IVenda[];
  saldo: number | null;
  "quantidade de vendas": number;
}
export interface IVenda {
  id: number;
  data: string;
  valor: number;
  cliente: {
    id: number;
    nome: string;
  };
}
