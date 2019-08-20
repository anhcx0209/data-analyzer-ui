import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ROUTE_TRANSITION } from '../../app.animation';
import { AggReport } from '../../model/agg-report';
import { MatPaginator, MatSort } from '@angular/material';
import { ListColumn } from 'app/core/list/list-column.model';
import { ListDataSource } from 'app/core/list/list-datasource';
import { ListDatabase } from 'app/core/list/list-database';
import { ReplaySubject, Observable } from 'rxjs';
import { REPORTS_DATA } from './reports.demo';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed } from 'app/core/utils/component-destroyed';
import { List } from 'app/core/list/list.interface';

@Component({
  selector: 'elastic-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ReportsComponent implements OnInit, List<AggReport>, OnInit, OnDestroy {
  ngOnDestroy(): void {    
  }

  subject$: ReplaySubject<AggReport[]> = new ReplaySubject<AggReport[]>(1);
  data$: Observable<AggReport[]>;
  reports: AggReport[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Report name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Report type', property: 'graphType', visible: true, isModelProperty: true },
  ] as ListColumn[];

  pageSize = 10;
  resultsLength: number;
  dataSource: ListDataSource<AggReport> | null;
  database: ListDatabase<AggReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.reports = REPORTS_DATA.map(report => new AggReport(report));    
    this.subject$.next(this.reports);
    this.data$ = this.subject$.asObservable();
    this.database = new ListDatabase<AggReport>();
    this.data$.pipe(
      takeUntil(componentDestroyed(this)),
      filter(Boolean)
    ).subscribe((rps) => {
      this.reports = rps;
      this.database.dataChange.next(rps);
      this.resultsLength = rps.length;
    });
    this.dataSource = new ListDataSource<AggReport>(this.database, this.sort, this.paginator, this.columns);
  }  

  onFilterChange(value): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = value;
  }

}
