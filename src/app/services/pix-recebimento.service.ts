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

  findByAtivo(): Observable<PixRecebimento> {
    return this.http.get<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix`);
  }

  save(pixRecebimento: PixRecebimento): Observable<PixRecebimento> {
    return this.http.post<PixRecebimento>(`${this.baseURL}/metodo-recebimento/pix`, pixRecebimento);
  }
}
