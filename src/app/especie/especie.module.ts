import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecieRoutingModule } from './especie-routing.module';
import { EspecieFormComponent } from './components/especie-form/especie-form.component';
import { EspecieListComponent } from './components/especie-list/especie-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    EspecieFormComponent,
    EspecieListComponent
  ],
  imports: [
    CommonModule,
    EspecieRoutingModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class EspecieModule { }
