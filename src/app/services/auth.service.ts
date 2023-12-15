import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { LocalStorageService } from './local-storage.service';
import { UsuarioService } from './usuario.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseURL: string = 'http://localhost:8080/auth';
    private tokenKey = 'jwt_token';
    private usuarioLogadoKey = 'usuario_logado';
    private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);

    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService,
        private jwtHelper: JwtHelperService,
        private usuarioService: UsuarioService) {

        this.initUsuarioLogado();

        this.localStorageService.getObservable().subscribe((key: string) => {
            if (key === this.usuarioLogadoKey) {
                this.initUsuarioLogado();
            }
        });

    }

    private initUsuarioLogado() {
        const usuario = localStorage.getItem(this.usuarioLogadoKey);
        if (usuario) {
            const usuarioLogado = JSON.parse(usuario);

            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
        }
    }


    login(email: string, senha: string): Observable<any> {
        const params = {
            login: email,
            senha: senha
        }

        this.removeToken();

        return this.http.post(`${this.baseURL}`, params, { observe: 'response' }).pipe(
            tap((res: any) => {
                const authToken = res.headers.get('Authorization') ?? '';
                if (authToken) {
                    this.setToken(authToken);
                    this.usuarioService.getUsuarioLogado().subscribe(usuario => {
                        console.log(usuario);
                        this.setUsuarioLogado(usuario);
                    })
                }
            })
        );
    }

    setUsuarioLogado(usuario: Usuario): void {
        this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
    }

    setToken(token: string): void {
        this.localStorageService.setItem(this.tokenKey, token);
    }

    getUsuarioLogado() {
        return this.usuarioLogadoSubject.asObservable();
    }

    getToken(): string | null {
        return this.localStorageService.getItem(this.tokenKey);
    }

    removeToken(): void {
        this.localStorageService.removeItem(this.tokenKey);
    }

    removeUsuarioLogado(): void {
        this.localStorageService.removeItem(this.usuarioLogadoKey);
        this.usuarioLogadoSubject.next(null);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        // Verifica se o token é nulo ou está expirado
        return !token || this.jwtHelper.isTokenExpired(token);
        // npm install @auth0/angular-jwt
    }

    isUserAdmin(): boolean {
        const token = this.getToken();

        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            if (decodedToken?.groups && Array.isArray(decodedToken.groups)) {
                return decodedToken.groups.includes('Administrador');
            }
        }

        return false;
    }

}
