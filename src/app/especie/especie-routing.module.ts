import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecieListComponent } from './components/especie-list/especie-list.component';
import { EspecieFormComponent } from './components/especie-form/especie-form.component';
import { especieResolver } from './resolver/especie-resolver';

const routes: Routes = [
  {path: 'list', component: EspecieListComponent},
  {path: 'new', component: EspecieFormComponent},
  {path: 'edit/:id', component: EspecieFormComponent, resolve: {especie: especieResolver}}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecieRoutingModule { }
