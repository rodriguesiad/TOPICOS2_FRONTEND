import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {PixRecebimento} from "../../../models/pix-recebimento.model";
import {inject} from "@angular/core";
import {PixRecebimentoService} from "../../../services/pix-recebimento.service";
import {DadosPessoais} from "../../../models/dados-pessoais.model";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";

export const dadosPessoaisResolver: ResolveFn<DadosPessoais> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(UsuarioLogadoService).getDadosPessoais();
  };
