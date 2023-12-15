import { Data } from "@angular/router";
import { EnderecoCompra } from "./endereco-compra.model";
import { StatusCompra } from "./status-compra.model";
import { ItemCarrinho } from "./item-carrinho.interface";
import { Usuario } from "./usuario.model";

export class Compra {
    id!: number;
    data!: Date;
    dataPagamento!: Date;
    enderecoCompra!: EnderecoCompra;
    usuario!: Usuario;
    statusCompra!: StatusCompra;
    totalCompra!: number;
    itensCompra!: ItemCarrinho[];
    sinBoleto!: boolean;
    sinPix!: boolean;
}