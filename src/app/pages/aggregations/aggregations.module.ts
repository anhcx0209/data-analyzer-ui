import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationsRoutingModule } from './aggregations-routing.module';
import { AggregationsCreateUpdateComponent } from './aggregations-create-update/aggregations-create-update.component';
import { AggregationsComponent } from './aggregations.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [AggregationsCreateUpdateComponent, AggregationsComponent],
  imports: [
    CommonModule,
    AggregationsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule
  ]
})
export class AggregationsModule { }
