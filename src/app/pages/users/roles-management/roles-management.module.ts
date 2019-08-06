import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesManagementRoutingModule } from './roles-management-routing.module';
import { RolesManagementComponent } from './roles-management.component';

@NgModule({
  declarations: [RolesManagementComponent],
  imports: [
    CommonModule,
    RolesManagementRoutingModule
  ]
})
export class RolesManagementModule { }
