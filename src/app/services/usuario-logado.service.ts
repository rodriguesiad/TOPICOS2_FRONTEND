import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DadosPessoais} from "../models/dados-pessoais.model";
import {Endereco} from "../models/endereco.model";
import {UsuarioEndereco} from "../models/usuario-endereco.model";
import {Pedido} from "../models/pedido.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoService {

  private baseURL: string = 'http://localhost:8080/usuario-logado';

  constructor(private http: HttpClient) { }

  getDadosPessoais(): Observable<DadosPessoais> {
    return this.http.get<DadosPessoais>(`${this.baseURL}/dados-pessoais`);
  }

  getEnderecos(): Observable<UsuarioEndereco> {
    return this.http.get<UsuarioEndereco>(`${this.baseURL}/enderecos`);
  }

  setDadosPessoais(dadosPessoais: DadosPessoais): Observable<DadosPessoais> {
    return this.http.patch<DadosPessoais>(`${this.baseURL}/dados-pessoais`, dadosPessoais);
  }

  alterarSenha(senhas: any): Observable<any> {
    return this.http.patch<any>(`${this.baseURL}/alterar-senha`, senhas);
  }

  insertEndereco(endereco: any) {
    const params = {
      principal: endereco.principal,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cep: endereco.cep,
      idMunicipio: endereco.cidade.id,
      titulo: endereco.titulo
    }

    return this.http.patch<Endereco>(`${this.baseURL}/enderecos`, params);
  }

  deleteEndereco(id: number): Observable<any> {
    return this.http.delete<Endereco>(`${this.baseURL}/enderecos/${id}`);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseURL}/minhas-compras`);
  }
}

