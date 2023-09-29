import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoria} from "../models/categoria.model";
import {BoletoRecebimento} from "../models/boleto-recebimento.model";

@Injectable({
  providedIn: 'root'
})
export class BoletoRecebimentoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findByAtivo(): Observable<BoletoRecebimento> {
    return this.http.get<BoletoRecebimento>(`${this.baseURL}/metodo-recebimento/boleto`);
  }

  save(boletoRecebimento: BoletoRecebimento): Observable<BoletoRecebimento> {
    return this.http.post<BoletoRecebimento>(`${this.baseURL}/metodo-recebimento/boleto`, boletoRecebimento);
  }
}
