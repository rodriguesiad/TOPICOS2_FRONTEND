import {TipoChavePix} from "./tipo-chave-pix";

export class PixPagamento {
  id!: number;
  chave!: string;
  tipoChavePix!: string;
  dataPagamento!: Date;
}
