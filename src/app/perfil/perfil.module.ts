import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import {PerfilRoutingModule} from './perfil-routing.module';
import {InformacoesPessoaisComponent} from './components/informacoes-pessoais/informacoes-pessoais.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import localePtBr from '@angular/common/locales/pt';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';

// Registre o local 'pt-BR'
registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    InformacoesPessoaisComponent,
    AlterarSenhaComponent
  ],
  exports: [
    InformacoesPessoaisComponent
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
        FormsModule
    ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
})
export class PerfilModule {
}
