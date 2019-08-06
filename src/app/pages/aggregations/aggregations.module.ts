import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationsRoutingModule } from './aggregations-routing.module';
import { AggregationsCreateUpdateComponent } from './aggregations-create-update/aggregations-create-update.component';
import { AggregationsComponent } from './aggregations.component';

@NgModule({
  declarations: [AggregationsCreateUpdateComponent, AggregationsComponent],
  imports: [
    CommonModule,
    AggregationsRoutingModule
  ]
})
export class AggregationsModule { }
