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

}
