import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoria} from "../models/categoria.model";
import {PixRecebimento} from "../models/pix-recebimento.model";

@Injectable({
  providedIn: 'root'
})
export class PixRecebimentoService {
  private baseURL: string =  'http://localhost:8080';
  constructor(private http: HttpClient) { }

  findByInativo(pagina: number, tamanhoPagina: number): Observable<PixRecebimento[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<PixRecebimento[]>(`${this.baseURL}/metodo-recebimento/pix/get-inativos`, {params});
  }

  findByChave(chave: string, pagina: number, tamanhoPagina: number): Observable<PixRecebimento[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<PixRecebimento[]>(`${this.baseURL}/metodo-recebimento/pix/search/${chave}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/metodo-recebimento/pix/count`);
  }

  countByChave(chave: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/metodo-recebimento/pix/search/${chave}/count`);
  }

  findByAtivo(): Observable<PixRecebimento> {
    return this.http.get<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix`);
  }

  findById(id: string): Observable<PixRecebimento> {
    return this.http.get<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix/${id}`);
  }

  save(pixRecebimento: PixRecebimento): Observable<PixRecebimento> {
    return this.http.post<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix`, pixRecebimento);
  }

  update(pixRecebimento: PixRecebimento): Observable<PixRecebimento> {
    return this.http.put<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix/${pixRecebimento.id}`, pixRecebimento);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix/${id}`);
  }
}
