import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueryListComponent} from './query-list/query-list.component';
import {QueryAddComponent} from './query-add/query-add.component';

const routes: Routes = [
  {
    path: 'list',
    component: QueryListComponent
  },
  {
    path: 'create',
    component: QueryAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
