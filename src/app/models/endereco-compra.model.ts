import { Cidade } from "./cidade.model";

export class EnderecoCompra {
    id!: number;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    cep!: string;
    bairro!: string;
    municipio!: Cidade;
}