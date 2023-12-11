import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { produtoResolver } from '../produto/resolver/produto-resolver';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CompraListComponent } from './components/compra-list/compra-list.component';
import { CompraViewComponent } from './components/compra-view/compra-view.component';
import { HomeComponent } from './components/home/home.component';
import { ProdutoShowComponent } from './components/produto-show/produto-show.component';
import { compraResolver } from './resolver/compra-resolver';
import { filtroResolver } from './resolver/filtro-resolver';

const routes: Routes = [{ path: 'carrinho', component: CarrinhoComponent },
{ path: 'view/:id', component: CompraViewComponent, resolve: { compra: compraResolver } },
{ path: 'list', component: CompraListComponent },
{ path: 'home', component: HomeComponent },
{ path: 'home/:filtro', component: HomeComponent, resolve: { filtro: filtroResolver } },
{ path: 'show/:id', component: ProdutoShowComponent, resolve: { produto: produtoResolver } },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
