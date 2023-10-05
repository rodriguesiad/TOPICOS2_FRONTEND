import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MetodoRecebimentoRoutingModule} from './metodo-recebimento-routing.module';
import {MetodoRecebimentoFormComponent} from './components/metodo-recebimento-form/metodo-recebimento-form.component';
import {MetodoRecebimentoListComponent} from './components/metodo-recebimento-list/metodo-recebimento-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

import {
  BoletoRecebimentoFormComponent
} from './components/metodo-recebimento-form/boleto-recebimento-form/boleto-recebimento-form.component';
import {
  PixRecebimentoFormComponent
} from './components/metodo-recebimento-form/pix-recebimento-form/pix-recebimento-form.component';
import {
  PixRecebimentoListComponent
} from './components/metodo-recebimento-list/pix-recebimento-list/pix-recebimento-list.component';
import {
  BoletoRecebimentoListComponent
} from './components/metodo-recebimento-list/boleto-recebimento-list/boleto-recebimento-list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    MetodoRecebimentoFormComponent,
    MetodoRecebimentoListComponent,
    BoletoRecebimentoFormComponent,
    BoletoRecebimentoListComponent,
    PixRecebimentoFormComponent,
    PixRecebimentoListComponent,
  ],
  imports: [
    CommonModule,
    MetodoRecebimentoRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class MetodoRecebimentoModule {
}
