import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.baseURL}/cidades`);
  }

  findById(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.baseURL}/cidades/${id}`);
  }

  save(cidade: Cidade): Observable<Cidade> {
    const obj = {
      nome: cidade.nome,
      idEstado: cidade.estado.id
    }
    return this.http.post<Cidade>(`${this.baseURL}/cidades`, obj);
  }

  update(cidade: Cidade): Observable<Cidade> {
    const obj = {
      nome: cidade.nome,
      idEstado: cidade.estado.id
    }
    return this.http.put<Cidade>(`${this.baseURL}/cidades/${cidade.id}`, obj );
  }

  delete(cidade: Cidade): Observable<any> {
    return this.http.delete<Cidade>(`${this.baseURL}/cidades/${cidade.id}`);
  }

}
