import { Cidade } from "./cidade.model";

export class Endereco {
    id!: number;
    principal!: boolean;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    bairro!: string;
    cep!: string;
    titulo!: string;
    municipio!: Cidade;
}