import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.model';
import { Usuario } from '../models/usuario.model';
import { Endereco } from '../models/endereco.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  findAllPaginado(pageNumber: number, pageSize: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/admin/paginado?page=${pageNumber}&size=${pageSize}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/usuarios/admin/count`);
  }

  findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuarios/${id}`);
  }

  findByIdPorAdmin(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuarios/admin/${id}`);
  }

  save(usuario: Usuario): Observable<Usuario> {
    const perfis = usuario.perfis.map(perfil => perfil.id);
    const usuarioDto = {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento.toString(),
      perfis: perfis,
      telefones: usuario.telefones,
      ativo: usuario.ativo
    }

    return this.http.post<Usuario>(`${this.baseURL}/usuarios/admin`, usuarioDto);
  }

  update(usuario: Usuario): Observable<Usuario> {
    const perfis = usuario.perfis.map(perfil => perfil.id);
    const usuarioDto = {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento.toString(),
      perfis: perfis,
      telefones: usuario.telefones,
      ativo: usuario.ativo
    }

    return this.http.put<Usuario>(`${this.baseURL}/usuarios/admin/${usuario.id}`, usuarioDto);
  }

  alterarSituacao(usuario: Usuario, situacao: boolean): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/usuarios/admin/situacao/${usuario.id}`, situacao);
  }

  findByCampoBusca(nomeParametro: string, situacaoParametro: string, pagina: number, tamanhoPagina: number): Observable<Usuario[]> {
    const params = {
      page: pagina.toString(),
      size: tamanhoPagina.toString(),
      campoBusca: nomeParametro,
      situacao: situacaoParametro
    }
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/search`, { params });
  }

  countByCampoBusca(nomeParametro: string, situacaoParametro: string): Observable<number> {
    const params = {
      campoBusca: nomeParametro,
      situacao: situacaoParametro
    }
    return this.http.get<number>(`${this.baseURL}/usuarios/search/count`, { params });
  }

  delete(usuario: Usuario): Observable<any> {
    return this.http.delete<Usuario>(`${this.baseURL}/usuarios/${usuario.id}`);
  }

  findPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.baseURL}/usuarios/perfis`);
  }

  getPerfilUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuario-logado`);
  }

  savePublic(usuario: Usuario, endereco: Endereco): Observable<Usuario> {
    const enderecoDTO = {
      idMunicipio: endereco.municipio.id,
      bairro: endereco.bairro,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cep: endereco.cep,
      principal: true
    }

    const usuarioDto = {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento.toString(),
      enderecos : [enderecoDTO]
    }

    return this.http.post<Usuario>(`${this.baseURL}/usuarios`, usuarioDto);
  }


}
