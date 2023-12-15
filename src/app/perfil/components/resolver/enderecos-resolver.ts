import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {UsuarioEndereco} from "../../../models/usuario-endereco.model";

export const enderecosResolver: ResolveFn<UsuarioEndereco> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(UsuarioLogadoService).getEnderecos();
  };
