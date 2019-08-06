import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesManagementComponent} from './roles-management.component';

const routes: Routes = [
  {
    path: '',
    component: RolesManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesManagementRoutingModule { }
