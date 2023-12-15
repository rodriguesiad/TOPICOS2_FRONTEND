import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import {PerfilRoutingModule} from './perfil-routing.module';
import {InformacoesPessoaisComponent} from './components/informacoes-pessoais/informacoes-pessoais.component';
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import localePtBr from '@angular/common/locales/pt';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import {MatCardModule} from "@angular/material/card";
import { EnderecoFormComponent } from './components/enderecos/endereco-form/endereco-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { PedidosComponent } from './components/pedidos/pedidos.component';

// Registre o local 'pt-BR'
registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    InformacoesPessoaisComponent,
    AlterarSenhaComponent,
    EnderecosComponent,
    EnderecoFormComponent,
    PedidosComponent
  ],
    exports: [
        InformacoesPessoaisComponent,
        EnderecosComponent,
        PedidosComponent
    ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
})
export class PerfilModule {
}
