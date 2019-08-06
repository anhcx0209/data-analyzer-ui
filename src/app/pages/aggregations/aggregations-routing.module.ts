import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AggregationsComponent} from './aggregations.component';
import {AggregationsCreateUpdateComponent} from './aggregations-create-update/aggregations-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: AggregationsComponent
  },
  {
    path: 'create',
    component: AggregationsCreateUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregationsRoutingModule { }
