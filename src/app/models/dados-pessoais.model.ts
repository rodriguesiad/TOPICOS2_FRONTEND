import {Telefone} from "./telefone.model";

export class DadosPessoais {
  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  dataNascimento!: Date;
  telefones!: Telefone[];
}
