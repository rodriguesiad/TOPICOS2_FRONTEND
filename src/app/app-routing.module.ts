import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compra/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'admin',
    children: [
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
        path: 'especies', loadChildren:
          () => import('./especie/especie.module')
            .then(m => m.EspecieModule)
      },

      {
        path: 'usuarios', loadChildren:
          () => import('./usuario/usuario.module')
            .then(m => m.UsuarioModule)
      },

      {
        path: 'racas', loadChildren:
          () => import('./raca/raca.module')
            .then(m => m.RacaModule)
      },

      {
        path: 'metodos-recebimento', loadChildren:
          () => import('./metodo-recebimento/metodo-recebimento.module')
            .then(m => m.MetodoRecebimentoModule)
      },

      {
        path: 'produtos', loadChildren:
          () => import('./produto/produto.module')
            .then(m => m.ProdutoModule)
      },

      {
        path: 'perfil', loadChildren:
          () => import('./perfil/perfil.module')
            .then(m => m.PerfilModule)
      },
    ]
  },

  {
    path: 'compras', loadChildren:
      () => import('./compra/compra.module')
        .then(m => m.CompraModule)
  },

  {
    path: 'auth', loadChildren:
      () => import('./auth/auth.module')
        .then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
