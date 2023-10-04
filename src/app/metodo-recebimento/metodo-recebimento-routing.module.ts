import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetodoRecebimentoFormComponent} from "./components/metodo-recebimento-form/metodo-recebimento-form.component";
import {pixRecebimentoResolver} from "./resolver/pix-recebimento-resolver";
import {boletoRecebimentoResolver} from "./resolver/boleto-recebimento-resolver";
import {MetodoRecebimentoListComponent} from "./components/metodo-recebimento-list/metodo-recebimento-list.component";

const routes: Routes = [
  {path: 'new', component: MetodoRecebimentoListComponent},
  {
    path: 'list',
    component: MetodoRecebimentoListComponent,
    resolve: {pix_recebimento: pixRecebimentoResolver, boleto_recebimento: boletoRecebimentoResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetodoRecebimentoRoutingModule {
}
