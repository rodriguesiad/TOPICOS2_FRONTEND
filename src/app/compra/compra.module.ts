import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CompraRoutingModule } from './compra-routing.module';
import { CompraViewComponent } from './components/compra-view/compra-view.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    CarrinhoComponent,
    CompraViewComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule
  ]
})
export class CompraModule { }
