import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseURL}/estados`);
  }

  findById(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.baseURL}/estados/${id}`);
  }

  save(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(`${this.baseURL}/estados`, estado);
  }

  update(estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.baseURL}/estados/${estado.id}`, estado );
  }

  delete(estado: Estado): Observable<any> {
    return this.http.delete<Estado>(`${this.baseURL}/estados/${estado.id}`);
  }

  findAllPaginado(pageNumber: number, pageSize: number): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseURL}/estados/paginado?page=${pageNumber}&size=${pageSize}`);
  }

  findByCampoBusca(nomeParametro: string, pagina: number, tamanhoPagina: number): Observable<Estado[]> {
    const params = {
      page: pagina.toString(),
      size: tamanhoPagina.toString(),
      nome: nomeParametro
    }
    return this.http.get<Estado[]>(`${this.baseURL}/produtos/search`, {params});
  }

  countByCampoBusca(nomeParametro: string): Observable<number> {
    const params = {
      nome: nomeParametro,
    }
    return this.http.get<number>(`${this.baseURL}/produtos/search/count`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/estados/count`);
  }
}
