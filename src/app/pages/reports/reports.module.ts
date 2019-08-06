import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import {PageHeaderModule} from '../../core/page-header/page-header.module';
import {BreadcrumbsModule} from '../../core/breadcrumbs/breadcrumbs.module';
import {UtilsModule} from '../../core/utils/utils.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule, MatRippleModule} from '@angular/material';
import {BarchartWidgetModule} from '../dashboard/dashboard-statistics/barchart-widget/barchart-widget.module';
import {AreachartWidgetModule} from '../dashboard/dashboard-statistics/areachart-widget/areachart-widget.module';
import {StateWidgetModule} from '../dashboard/dashboard-statistics/state-widget/state-widget.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,

    // plugins
    PageHeaderModule,
    BreadcrumbsModule,
    UtilsModule,
    FlexLayoutModule,
    MatRippleModule,
    MatListModule,

    // charts module
    BarchartWidgetModule,
    StateWidgetModule,
    AreachartWidgetModule
  ]
})
export class ReportsModule { }
