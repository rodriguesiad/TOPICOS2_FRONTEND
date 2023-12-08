import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CompraViewComponent } from './components/compra-view/compra-view.component';
import { compraResolver } from './resolver/compra-resolver';

const routes: Routes = [{ path: 'carrinho', component: CarrinhoComponent },
                        { path: 'view/:id', component: CompraViewComponent, resolve: { compra: compraResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
