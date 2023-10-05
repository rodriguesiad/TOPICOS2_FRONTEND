import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie.model';


@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Especie[]> {
    return this.http.get<Especie[]>(`${this.baseURL}/especies`);
  }

  findById(id: string): Observable<Especie> {
    return this.http.get<Especie>(`${this.baseURL}/especies/${id}`);
  }

  save(especie: Especie): Observable<Especie> {
    return this.http.post<Especie>(`${this.baseURL}/especies`, especie);
  }

  update(especie: Especie): Observable<Especie>{

    const obj = {
      nome: especie.nome,
      ativo: especie.ativo
    }

    return this.http.post<Especie>(`${this.baseURL}/especies/${especie.id}`, obj);
  }

  delete(especie: Especie): Observable<any>{

    return this.http.delete<Especie>(`${this.baseURL}/especies/${especie.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/especies/count`);
  }

  findAllPaginado(pageNumber: number, pageSize: number): Observable<Especie[]> {
    return this.http.get<Especie[]>(`${this.baseURL}/especies/paginado?page=${pageNumber}&size=${pageSize}`);
  }
}
