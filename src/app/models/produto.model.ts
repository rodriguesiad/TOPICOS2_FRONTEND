import { Categoria } from "./categoria.model";
import { Especie } from "./especie.model";
import { Raca } from "./raca.model";

export class Produto {
    id!: number;
    nome!: string;
    descricao!: string;
    preco!: number;
    peso!:number;
    estoque!: number;
    porteAnimal!:number;
    ativo!: boolean;
    raca!: Raca;
    categoria!: Categoria;
    especie!: Especie;
    nomeImagem!: string;
}
