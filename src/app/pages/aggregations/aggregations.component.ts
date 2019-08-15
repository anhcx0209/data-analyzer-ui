import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AssAggregation } from '../../model/ass-aggregation';
import { ListColumn } from '../../core/list/list-column.model';
import { ListDataSource } from '../../core/list/list-datasource';
import { ListDatabase } from '../../core/list/list-database';
import { MatPaginator, MatSort } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../../core/utils/component-destroyed';
import { DEMO_AGGREGATIONS } from 'app/model/ass-aggregations.demo';

@Component({
  selector: 'elastic-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.scss']
})
export class AggregationsComponent implements OnInit, OnDestroy {

  subject$: ReplaySubject<AssAggregation[]> = new ReplaySubject<AssAggregation[]>(1);
  data$: Observable<AssAggregation[]>;
  aggregations: AssAggregation[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Content', property: 'content', visible: true, isModelProperty: true },
    { name: 'Indexes', property: 'indexes', visible: true, isModelProperty: true },
    { name: 'Graph Type', property: 'type', visible: true, isModelProperty: true }
  ] as ListColumn[];

  pageSize = 10;
  resultsLength: number;
  dataSource: ListDataSource<AssAggregation> | null;
  database: ListDatabase<AssAggregation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  constructor(
    private aggService: AggregationService
  ) { }

  assAggregations$: Observable<AssAggregation[]>;

  ngOnInit() {
    this.aggregations = DEMO_AGGREGATIONS.map(agg => new AssAggregation(agg));
    this.subject$.next(this.aggregations);
    this.data$ = this.subject$.asObservable();
    this.database = new ListDatabase<AssAggregation>();
    this.data$.pipe(
      takeUntil(componentDestroyed(this)),
      filter(Boolean)
    ).subscribe((aggregations) => {
      this.aggregations = aggregations;
      this.database.dataChange.next(aggregations);
      this.resultsLength = aggregations.length;
    });
    this.dataSource = new ListDataSource<AssAggregation>(this.database, this.sort, this.paginator, this.columns);
  }

  ngOnDestroy(): void {
  }

  onFilterChange(value): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = value;
  }


}
