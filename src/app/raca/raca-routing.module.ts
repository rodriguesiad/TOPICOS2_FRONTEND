import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacaListComponent } from './components/raca-list/raca-list.component';
import { RacaFormComponent } from './components/raca-form/raca-form.component';
import { racaResolver } from './resolver/raca-resolver';

const routes: Routes = [
  { path: 'list', component: RacaListComponent },
  { path: 'new', component: RacaFormComponent },
  { path: 'edit/:id', component: RacaFormComponent, resolve: { raca: racaResolver } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacaRoutingModule { }
