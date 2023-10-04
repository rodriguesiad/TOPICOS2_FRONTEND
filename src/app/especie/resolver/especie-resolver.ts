import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Especie } from "src/app/models/especie.model";
import { EspecieService } from "src/app/services/especie.service";

export const especieResolver: ResolveFn<Especie> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EspecieService).findById(route.paramMap.get('id')!);
    };