import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationsRoutingModule } from './aggregations-routing.module';
import { AggregationsCreateUpdateComponent } from './aggregations-create-update/aggregations-create-update.component';
import { AggregationsComponent } from './aggregations.component';
import {
  MatButtonModule, MatCheckboxModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatPaginatorModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule, MatSortModule,
  MatTableModule
} from '@angular/material';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListModule } from '../../core/list/list.module';
import { PageHeaderModule } from 'app/core/page-header/page-header.module';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AggregationsCreateUpdateComponent, AggregationsComponent],
  imports: [
    CommonModule,
    AggregationsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    PageHeaderModule,
    BreadcrumbsModule,
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
    SweetAlert2Module,
    MatDialogModule,
    NgxJsonViewerModule,

    ListModule
  ]
})
export class AggregationsModule { }
