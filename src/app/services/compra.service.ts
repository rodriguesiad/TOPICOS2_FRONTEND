import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra.model';
import { EnderecoCompra } from '../models/endereco-compra.model';
import { ItemCarrinho } from '../models/item-carrinho.interface';
import { StatusCompra } from '../models/status-compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private baseURL: string = 'http://localhost:8080/compras';

  constructor(private http: HttpClient) { }

  save(carrinho: ItemCarrinho[], enderecoCompra: EnderecoCompra): Observable<Compra> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idProduto: item.id
    }));

    const produtos = {
      enderecoCompra,
      itensCompra: itens
    };

    return this.http.post<Compra>(`${this.baseURL}`, produtos);
  }

  findById(id: string): Observable<Compra> {
    return this.http.get<Compra>(`${this.baseURL}/${id}`);
  }

  pagarPorBoleto(idCompra: number): Observable<any> {
    return this.http.patch<any>(`${this.baseURL}/${idCompra}/pagamento/boleto`, idCompra);
  }

  pagarPorPix(idCompra: number): Observable<any> {
    return this.http.patch<any>(`${this.baseURL}/${idCompra}/pagamento/pix`, idCompra);
  }

  findStatusCompra(): Observable<StatusCompra[]> {
    return this.http.get<StatusCompra[]>(`${this.baseURL}/status-compra`);
  }

}
