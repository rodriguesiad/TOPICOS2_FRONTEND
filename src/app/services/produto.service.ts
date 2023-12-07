import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(pagina: number, tamanhoPagina: number): Observable<Produto[]> {

    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }

    return this.http.get<Produto[]>(`${this.baseURL}/produtos`, {params});
  }

  findById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseURL}/produtos/${id}`);
  }

  save(produto: Produto): Observable<Produto> {

    const obj = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      peso: produto.peso,
      porte: produto.porteAnimal,
      estoque: produto.estoque,
      idRaca: produto.raca.id,
      idCategoria: produto.categoria.id,
      idEspecie: produto.especie.id
    }
    console.log(obj);
    return this.http.post<Produto>(`${this.baseURL}/produtos`, obj);
  }

  update(produto: Produto): Observable<Produto> {

    const obj = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      peso: produto.peso,
      porte: produto.porteAnimal,
      estoque: produto.estoque,
      idRaca: produto.raca.id,
      idCategoria: produto.categoria.id,
      idEspecie: produto.especie.id
    }

    return this.http.put<Produto>(`${this.baseURL}/produtos/${produto.id}`, obj);
  }

  delete(produto: Produto): Observable<any> {

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
    return this.http.get<Produto[]>(`${this.baseURL}/produtos/search`, { params });
  }

  countByCampoBusca(nomeParametro: string, ativoParametro: boolean): Observable<number> {
    const params = {
      nome: nomeParametro,
      ativo: ativoParametro
    }
    return this.http.get<number>(`${this.baseURL}/produtos/search/count`, { params });
  }

  alterarSituacao(especie: Produto, situacao: boolean): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseURL}/produtos/situacao/${especie.id}`, situacao);
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.http.patch<Produto>(`${this.baseURL}/produtos/image/upload`, formData);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseURL}/produtos/image/download/${nomeImagem}`;
  }

}
