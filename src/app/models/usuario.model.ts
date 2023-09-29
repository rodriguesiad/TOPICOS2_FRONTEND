import { Perfil } from "./perfil-enum-model";
import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    dataNascimento!: Date;
    perfis!: Perfil[];
    telefones!: Telefone[];
    ativo!: boolean;
}