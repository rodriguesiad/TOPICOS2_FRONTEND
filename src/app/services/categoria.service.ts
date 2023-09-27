import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseURL}/categorias`);
  }

  findById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseURL}/categorias/${id}`);
  }

  save(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseURL}/categorias`, categoria);
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseURL}/categorias/${categoria.id}`, categoria );
  }

  delete(cidade: Categoria): Observable<any> {
    return this.http.delete<Categoria>(`${this.baseURL}/categorias/${cidade.id}`);
  }

}
