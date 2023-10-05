import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Raca } from "src/app/models/raca.model";
import { RacaService } from "src/app/services/raca.service";

export const racaResolver: ResolveFn<Raca> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RacaService).findById(route.paramMap.get('id')!);
    };
