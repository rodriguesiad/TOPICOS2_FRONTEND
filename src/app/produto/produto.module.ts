import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlertModule } from "ngx-bootstrap/alert";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoRoutingModule } from './produto-routing.module';




@NgModule({
  declarations: [
    ProdutoListComponent,
    ProdutoFormComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    CarouselModule,
    AlertModule,
    MatTabsModule
  ]
})
export class ProdutoModule { }
