import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";

export const filtroResolver: any =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return route.paramMap.get('filtro');
  };
