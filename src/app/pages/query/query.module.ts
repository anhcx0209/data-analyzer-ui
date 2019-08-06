import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryAddComponent } from './query-add/query-add.component';
import { QueryListComponent } from './query-list/query-list.component';

@NgModule({
  declarations: [QueryAddComponent, QueryListComponent],
  imports: [
    CommonModule,
    QueryRoutingModule
  ]
})
export class QueryModule { }
