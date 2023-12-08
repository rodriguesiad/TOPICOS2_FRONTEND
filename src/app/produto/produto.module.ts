import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {AlertModule} from "ngx-bootstrap/alert";
import { ProdutoShowComponent } from './components/produto-show/produto-show.component';
import {MatTabsModule} from "@angular/material/tabs";




@NgModule({
  declarations: [
    ProdutoListComponent,
    ProdutoFormComponent,
    HomeComponent,
    ProdutoShowComponent
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
