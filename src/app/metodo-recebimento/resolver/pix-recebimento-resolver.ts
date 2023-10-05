import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { PixRecebimento } from "src/app/models/pix-recebimento.model";
import { PixRecebimentoService } from "src/app/services/pix-recebimento.service";

export const pixRecebimentoResolver: ResolveFn<PixRecebimento> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PixRecebimentoService).findByAtivo();
  };

export const pixRecebimentoEditResolver: ResolveFn<PixRecebimento> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PixRecebimentoService).findById(route.paramMap.get('id')!);
  };
