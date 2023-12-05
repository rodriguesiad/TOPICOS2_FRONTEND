import { Perfil } from "./perfil.model";
import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    nome!: string;
    email!: string;
    cpf!: string;
    senha!: string;
    dataNascimento!: Date;
    perfis!: Perfil[];
    telefones!: Telefone[];
    ativo!: boolean;
}