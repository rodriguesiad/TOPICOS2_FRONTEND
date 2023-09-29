import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raca } from '../models/raca.model';


@Injectable({
  providedIn: 'root'
})
export class RacaService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Raca[]> {
    return this.http.get<Raca[]>(`${this.baseURL}/racas`);
  }

  findAllPaginado(pageNumber: number, pageSize: number): Observable<Raca[]> {
    return this.http.get<Raca[]>(`${this.baseURL}/racas/paginado?page=${pageNumber}&size=${pageSize}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/racas/count`);
  }

  findById(id: string): Observable<Raca> {
    return this.http.get<Raca>(`${this.baseURL}/racas/${id}`);
  }

  save(raca: Raca): Observable<Raca> {
    return this.http.post<Raca>(`${this.baseURL}/racas`, raca);
  }

  update(raca: Raca): Observable<Raca> {
    return this.http.put<Raca>(`${this.baseURL}/racas/${raca.id}`, raca );
  }

  alterarSituacao(raca: Raca, situacao: boolean): Observable<Raca> {
    return this.http.put<Raca>(`${this.baseURL}/racas/situacao/${raca.id}`, situacao );
  }

  delete(cidade: Raca): Observable<any> {
    return this.http.delete<Raca>(`${this.baseURL}/racas/${cidade.id}`);
  }

}
