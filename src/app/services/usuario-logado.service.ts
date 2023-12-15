import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DadosPessoais} from "../models/dados-pessoais.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoService {

  private baseURL: string = 'http://localhost:8080/usuario-logado';

  constructor(private http: HttpClient) { }

  getDadosPessoais(): Observable<DadosPessoais> {
    return this.http.get<DadosPessoais>(`${this.baseURL}/dados-pessoais`);
  }

  setDadosPessoais(dadosPessoais: DadosPessoais): Observable<DadosPessoais> {
    return this.http.patch<DadosPessoais>(`${this.baseURL}/dados-pessoais`, dadosPessoais);
  }

  alterarSenha(senhas: any): Observable<any> {
    return this.http.patch<any>(`${this.baseURL}/alterar-senha`, senhas);
  }
}

