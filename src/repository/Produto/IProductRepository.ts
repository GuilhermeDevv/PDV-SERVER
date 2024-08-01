import { Produto } from "@prisma/client";
import {
  ICreateProdutoDTO,
  IUpdateProdutoDTO,
  IProdutoReactSelect,
} from "../../dtos/ProdutoDTO";

export interface IProdutoRepository {
  create(data: ICreateProdutoDTO): Promise<Produto>;
  // findByID(id: string): Promise<Produto | null>;
  findByAll(): Promise<Produto[]>;
  update(id: string, data: IUpdateProdutoDTO): Promise<Produto>;
  findByAllProductsReactSelect(): Promise<IProdutoReactSelect[]>;
}
