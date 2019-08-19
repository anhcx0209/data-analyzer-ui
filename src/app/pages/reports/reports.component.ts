import { Component, OnInit } from '@angular/core';
import {ROUTE_TRANSITION} from '../../app.animation';
import { AggReport } from '../../model/agg-report';

@Component({
  selector: 'elastic-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ReportsComponent implements OnInit {

  reports: Array<AggReport> = [
    {
      id: 1,
      name: 'Report 1',
      jsonQuery: '',
      aggregationContent: '',
      modifiableFields: '',
      fullQueryContent: '',
    },
    {
      id: 2,
      name: 'Report 2',
      jsonQuery: '',
      aggregationContent: '',
      modifiableFields: '',
      fullQueryContent: '',
    },
    {
      id: 3,
      name: 'Report 3',
      jsonQuery: '',
      aggregationContent: '',
      modifiableFields: '',
      fullQueryContent: '',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  scrollTo(elem) {
    elem.scrollIntoView({
      behavior: 'smooth', // or "auto" or "instant"
      block: 'start', // or "end"
      inline: 'nearest'
    });
  }

  loadReport(reportId: number) {
    console.log('loaded report');
  }

}
