import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PerfilComponent} from "./components/perfil/perfil.component";
import {dadosPessoaisResolver} from "./components/resolver/dados-pessoais-resolver";
import {enderecosResolver} from "./components/resolver/enderecos-resolver";

const routes: Routes = [
  {
    path: 'view', component: PerfilComponent,
    resolve: {dadosPessoais: dadosPessoaisResolver, enderecos: enderecosResolver},
    data: {isEdicao: false}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
