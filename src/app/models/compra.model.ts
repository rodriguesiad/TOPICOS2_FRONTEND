import { Data } from "@angular/router";
import { EnderecoCompra } from "./endereco-compra.model";
import { StatusCompra } from "./status-compra.model";
import { ItemCarrinho } from "./item-carrinho.interface";

export class Compra {
    id!: number;
    data!: Data;
    enderecoCompra!: EnderecoCompra;
    statusCompra!: StatusCompra;
    itensCompra!: ItemCarrinho[]
}