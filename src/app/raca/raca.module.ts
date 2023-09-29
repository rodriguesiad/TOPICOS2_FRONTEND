import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacaRoutingModule } from './raca-routing.module';
import { RacaFormComponent } from './components/raca-form/raca-form.component';
import { RacaListComponent } from './components/raca-list/raca-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RacaFormComponent,
    RacaListComponent
  ],
  imports: [
    CommonModule,
    RacaRoutingModule,
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
    FormsModule,
    MatDialogModule
  ]
})
export class RacaModule { }
