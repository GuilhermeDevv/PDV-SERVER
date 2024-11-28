import { Produto } from "@prisma/client";

export interface ICreateProdutoDTO {
  id_produto: string;
  nome: string;
  preco: number;
  quantidade: number;
  custo: number;
  estoque: number;
  descricao?: string;
  isOnline: boolean;
  createdAt: Date;
  fornecedor: string;
  categoriaId: number;
  url: string;
}

export interface IUpdateProdutoDTO extends Partial<Produto> {}

export interface IProdutoReactSelect {
  value: string;
  label: string;
  price: number;
}
