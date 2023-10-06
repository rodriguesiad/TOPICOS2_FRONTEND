import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseURL}/produtos`);
  }

  findById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseURL}/produtos/${id}`);
  }

  save(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseURL}/produtos`, produto);
  }

  update(produto: Produto): Observable<Produto>{

    const obj = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      raca: produto.raca,
      categoria: produto.categoria,
      especie: produto.especie
    }

    return this.http.post<Produto>(`${this.baseURL}/produtos/${produto.id}`, obj);
  }

  delete(produto: Produto): Observable<any>{

    return this.http.delete<Produto>(`${this.baseURL}/produtos/${produto.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/produtos/count`);
  }

  findAllPaginado(pageNumber: number, pageSize: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseURL}/produtos/paginado?page=${pageNumber}&size=${pageSize}`);
  }

  findByCampoBusca(nomeParametro: string, ativoParametro: boolean, pagina: number, tamanhoPagina: number): Observable<Produto[]> {
    const params = {
      page: pagina.toString(),
      size: tamanhoPagina.toString(),
      nome: nomeParametro,
      ativo: ativoParametro
    }
    return this.http.get<Produto[]>(`${this.baseURL}/produtos/search`, {params});
  }

  countByCampoBusca(nomeParametro: string, ativoParametro: boolean): Observable<number> {
    const params = {
      nome: nomeParametro,
      ativo: ativoParametro
    }
    return this.http.get<number>(`${this.baseURL}/produtos/search/count`, {params});
  }
}
