import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetodoRecebimentoFormComponent} from "./components/metodo-recebimento-form/metodo-recebimento-form.component";
import {pixRecebimentoEditResolver, pixRecebimentoResolver} from "./resolver/pix-recebimento-resolver";
import {boletoRecebimentoEditResolver, boletoRecebimentoResolver} from "./resolver/boleto-recebimento-resolver";
import {MetodoRecebimentoListComponent} from "./components/metodo-recebimento-list/metodo-recebimento-list.component";

const routes: Routes = [
  {path: 'new', component: MetodoRecebimentoFormComponent, data: {isCadastro: true}},
  {
    path: 'show',
    component: MetodoRecebimentoFormComponent,
    resolve: {pix_recebimento: pixRecebimentoResolver, boleto_recebimento: boletoRecebimentoResolver}
  },
  {
    path: 'list', component: MetodoRecebimentoListComponent
  },
  {
    path: 'edit/pix/:id',
    component: MetodoRecebimentoFormComponent,
    resolve: { pix_recebimento: pixRecebimentoEditResolver },
    data: {isEdicao: true}
  },
  {
    path: 'edit/boleto/:id',
    component: MetodoRecebimentoFormComponent,
    resolve: {boleto_recebimento: boletoRecebimentoEditResolver},
    data: {isEdicao: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetodoRecebimentoRoutingModule {
}
