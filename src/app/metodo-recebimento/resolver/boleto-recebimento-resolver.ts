import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { BoletoRecebimento } from "src/app/models/boleto-recebimento.model";
import { BoletoRecebimentoService } from "src/app/services/boleto-recebimento.service";

export const boletoRecebimentoResolver: ResolveFn<BoletoRecebimento> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(BoletoRecebimentoService).findByAtivo();
  };
