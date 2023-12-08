import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { produtoResolver } from './resolver/produto-resolver';
import {HomeComponent} from "./components/home/home.component";
import {ProdutoShowComponent} from "./components/produto-show/produto-show.component";
import {filtroResolver} from "./resolver/filtro-resolver";

const routes: Routes = [
  {path: 'list', component: ProdutoListComponent},
  {path: 'new', component: ProdutoFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/:filtro', component: HomeComponent, resolve: {filtro: filtroResolver}},
  {path: 'show/:id', component: ProdutoShowComponent, resolve: {produto: produtoResolver}},
  {path: 'edit/:id', component: ProdutoFormComponent, resolve: {produto: produtoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
