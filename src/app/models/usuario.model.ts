import { Telefone } from "./telefone.model";
import { PerfilEnum } from "./perfil.enum";

export class Usuario {
    id!: number;
    nome!: string;
    email!: string;
    cpf!: string;
    senha!: string;
    dataNascimento!: Date;
    perfis!: number[];
    telefones!: Telefone[];
    ativo!: boolean;
}