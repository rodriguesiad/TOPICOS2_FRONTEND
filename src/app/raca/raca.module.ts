import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacaRoutingModule } from './raca-routing.module';
import { RacaFormComponent } from './components/raca-form/raca-form.component';
import { RacaListComponent } from './components/raca-list/raca-list.component';


@NgModule({
  declarations: [
    RacaFormComponent,
    RacaListComponent
  ],
  imports: [
    CommonModule,
    RacaRoutingModule
  ]
})
export class RacaModule { }
