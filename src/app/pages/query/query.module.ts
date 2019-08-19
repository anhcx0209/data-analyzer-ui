import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRoutingModule } from './query-routing.module';
import { QueryAddComponent } from './query-add/query-add.component';
import { QueryListComponent } from './query-list/query-list.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { UtilsModule } from '../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule, MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [QueryAddComponent, QueryListComponent],
  imports: [
    CommonModule,
    QueryRoutingModule,
    SweetAlert2Module,
    FormsModule,
    BreadcrumbsModule,
    UtilsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    PageHeaderModule
  ]
})
export class QueryModule {
}
