import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoria} from "../models/categoria.model";
import {BoletoRecebimento} from "../models/boleto-recebimento.model";
import {PixRecebimento} from "../models/pix-recebimento.model";

@Injectable({
  providedIn: 'root'
})
export class BoletoRecebimentoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findByInativo(pagina: number, tamanhoPagina: number): Observable<BoletoRecebimento[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<BoletoRecebimento[]>(`${this.baseURL}/metodo-recebimento/boleto/get-inativos`, {params});
  }

  findByCNPJ(cnpj: string, pagina: number, tamanhoPagina: number): Observable<BoletoRecebimento[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<BoletoRecebimento[]>(`${this.baseURL}/metodo-recebimento/boleto/search/${cnpj}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/metodo-recebimento/boleto/count`);
  }

  countByCNPJ(cnpj: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/metodo-recebimento/boleto/search/${cnpj}/count`);
  }

  findByAtivo(): Observable<BoletoRecebimento> {
    return this.http.get<BoletoRecebimento>(`${this.baseURL}/metodo-recebimento/boleto`);
  }

  findById(id: string): Observable<BoletoRecebimento> {
    return this.http.get<BoletoRecebimento>(`${this.baseURL}/metodo-recebimento/boleto/${id}`);
  }

  save(boletoRecebimento: BoletoRecebimento): Observable<BoletoRecebimento> {
    return this.http.post<BoletoRecebimento>(`${this.baseURL}/metodo-recebimento/boleto`, boletoRecebimento);
  }

  update(boletoRecebimento: BoletoRecebimento): Observable<PixRecebimento> {
    return this.http.put<PixRecebimento>(`${this.baseURL}/metodo-recebimento/boleto/${boletoRecebimento.id}`, boletoRecebimento);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<PixRecebimento>(`${this.baseURL}/metodo-recebimento/boleto/${id}`);
  }
}
