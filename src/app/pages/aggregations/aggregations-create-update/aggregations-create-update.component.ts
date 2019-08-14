import {Component, OnInit} from '@angular/core';
import {IdxService} from '../../../service/idx.service';
import {Observable, of} from 'rxjs';
import {AssIndex} from '../../../model/ass-index';
import {GRAPHS} from '../../../model/mock-agg-graphs';
import {AssGraph} from '../../../model/ass-graph';
import {GraphService} from '../../../service/graph.service';
import {AssAggregation} from '../../../model/ass-aggregation';

@Component({
  selector: 'elastic-aggregations-create-update',
  templateUrl: './aggregations-create-update.component.html',
  styleUrls: ['./aggregations-create-update.component.scss']
})
export class AggregationsCreateUpdateComponent implements OnInit {

  showBasicFormSource = false;

  name: string;


  graphs: AssGraph[];

  indexes$: Observable<AssIndex[]>;

  model = new AssAggregation();

  constructor(private idxService: IdxService, private graphService: GraphService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.indexes$ = this.idxService.getIndexes();
    this.graphs = GRAPHS;
  }

  newAggregation() {
    // TODO: validation here
    console.log(JSON.stringify(this.model));
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
