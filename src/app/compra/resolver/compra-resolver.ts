import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Compra } from "src/app/models/compra.model";
import { CompraService } from "src/app/services/compra.service";

export const compraResolver: ResolveFn<Compra> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CompraService).findById(route.paramMap.get('id')!);
    };