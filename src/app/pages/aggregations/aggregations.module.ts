import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationsRoutingModule } from './aggregations-routing.module';
import { AggregationsCreateUpdateComponent } from './aggregations-create-update/aggregations-create-update.component';
import { AggregationsComponent } from './aggregations.component';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatPaginatorModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ListModule} from '../../core/list/list.module';

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
    MatSliderModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,

    ListModule
  ]
})
export class AggregationsModule { }
