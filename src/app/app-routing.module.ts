import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'estados', loadChildren:
      () => import('./estado/estado.module')
        .then(m => m.EstadoModule)
  },

  {
    path: 'cidades', loadChildren:
      () => import('./cidade/cidade.module')
        .then(m => m.CidadeModule)
  },

  {
    path: 'categorias', loadChildren:
      () => import('./categoria/categoria.module')
        .then(m => m.CategoriaModule)
  },

  {
    path: 'metodos-recebimento', loadChildren:
      () => import('./metodo-recebimento/metodo-recebimento.module')
        .then(m => m.MetodoRecebimentoModule)
  },

  
  {
    path: 'racas', loadChildren:
      () => import('./raca/raca.module')
        .then(m => m.RacaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
