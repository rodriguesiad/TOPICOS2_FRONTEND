import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoletoPagamento } from '../models/boleto-pagamento.model';
import { Compra } from '../models/compra.model';
import { EnderecoCompra } from '../models/endereco-compra.model';
import { ItemCarrinho } from '../models/item-carrinho.interface';
import { PixPagamento } from '../models/pix-pagamento.model';
import { StatusCompra } from '../models/status-compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private baseURL: string = 'http://localhost:8080/compras';
  private metodoPagamentoSubject: BehaviorSubject<BoletoPagamento | PixPagamento> = new BehaviorSubject<BoletoPagamento | PixPagamento>({} as BoletoPagamento | PixPagamento);
  public metodoPagamento$: Observable<BoletoPagamento | PixPagamento> = this.metodoPagamentoSubject.asObservable();

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

  getMetodoPagamento(idCompra: number): Observable<BoletoPagamento | PixPagamento> {
    return this.http.get<any>(`${this.baseURL}/${idCompra}/pagamento`).pipe(
      map((response: any) => {
        let novoMetodo: BoletoPagamento | PixPagamento;

        if (response != null && response.banco != null) {
          novoMetodo = this.converterParaBoleto(response);
        } else {
          novoMetodo = this.converterParaPix(response);
        }

        const metodoAtual = this.metodoPagamentoSubject.getValue();

        if (!metodoAtual || JSON.stringify(metodoAtual) !== JSON.stringify(novoMetodo)) {
          this.metodoPagamentoSubject.next(novoMetodo);
        }

        return novoMetodo;
      })
    );
  }

  private converterParaBoleto(data: any): BoletoPagamento {
    return data as BoletoPagamento;
  }

  private converterParaPix(data: any): PixPagamento {
    return data as PixPagamento;
  }

  findAllPaginado(numberP: number, size: number): Observable<Compra[]> {
    const params = {
      page: numberP.toString(),
      pageSize: size.toString()
    }

    return this.http.get<Compra[]>(`${this.baseURL}/all`, { params });
  }

}
