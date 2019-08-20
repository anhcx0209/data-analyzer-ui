import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },
  { path: 'id/:reportId', component: ReportDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
