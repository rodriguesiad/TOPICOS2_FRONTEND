import {Endereco} from "./endereco.model";
import {StatusCompra} from "./status-compra.model";
import {ItemCarrinho} from "./item-carrinho.interface";

export class Pedido {
  id!: number;
  data!: Date;
  dataPagamento!: Date;
  totalCompra!: number;
  enderecoCompra!: Endereco;
  statusCompra!: StatusCompra;
  itensCompra!: ItemCarrinho[];
}
