import { Endereco } from "./endereco.model";

export interface Produto {
  id:string;
  nome: string;
  quantidade: number;
  valorCompra: number;
  porcentagem:number;
  valorVenda: number;
  fornecedor: string;
  razaoSocial:string,
  cnpj:string,
  telefone:string,
  cep:string,
  logradouro:string,
  bairro:string,
  localidade:string,
  endereco: Endereco,  
}