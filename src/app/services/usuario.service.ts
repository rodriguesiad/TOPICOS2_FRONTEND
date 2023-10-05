import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}


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
    return this.http.post<Usuario>(`${this.baseURL}/usuarios/admin`, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/usuarios/admin/${usuario.id}`, usuario );
  }

  alterarSituacao(usuario: Usuario, situacao: boolean): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/usuarios/admin/situacao/${usuario.id}`, situacao );
  }

}
