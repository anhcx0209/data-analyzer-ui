import { Component, OnInit, ViewChild, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { QueryBuilderComponent, QueryBuilderConfig } from 'angular2-query-builder';
import { RuleSet } from 'angular2-query-builder/dist/components/query-builder/query-builder.interfaces';
import { IdxService } from 'app/service/idx.service';
import { AssQuery } from 'app/model/ass-query';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import Chart from 'chart.js';
import { AssIndex } from '../../../model/ass-index';
import { AssAggregation } from '../../../model/ass-aggregation';
import { AggregationService } from '../../../service/aggregation.service';
import { areachartWidgetData } from 'app/pages/dashboard/dashboard-statistics/areachart-widget/areachart-widget.data';

interface AssRule {
  id: string;
  field: string;
  type: string;
  input: string;
  operator: string;
  value: string;
}

interface AssRuleSet {
  condition: string;
  rules: Array<AssRule | AssRuleSet>;
  valid: boolean;
}

@Component({
  selector: 'elastic-query-add',
  templateUrl: './query-add.component.html',
  styleUrls: ['./query-add.component.scss']
})
export class QueryAddComponent implements OnInit, AfterViewInit {


  constructor(private idxService: IdxService,
    private aggService: AggregationService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {

  }

  get lastQuery() {
    const lastQueryObj = {
      index: this.queryModel.index_type,
      query: this.queryModel.query ? this.rebuildRuleSet(this.queryModel.query) : '{}',
      agg: {
        aggs: this.selectedAgg ? JSON.parse(this.selectedAgg.content) : '{}'
      }
    };
    return lastQueryObj;
  }

  get lastQueryJson() {
    const lastQueryObj = {
      index: this.queryModel.index_type,
      query: this.queryModel.query ? this.rebuildRuleSet(this.queryModel.query) : '{}',
      agg: {
        aggs: this.selectedAgg ? JSON.parse(this.selectedAgg.content) : '{}'
      }
    };
    return JSON.stringify(lastQueryObj);
  }

  query = {
    condition: 'and',
    rules: [
      { field: 'age', operator: '<=', value: 'Bob' },
      { field: 'gender', operator: '>=', value: 'm' }
    ]
  };

  config2: QueryBuilderConfig = {
    fields: {
      age: { name: 'Age', type: 'number' },
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          { name: 'Male', value: 'm' },
          { name: 'Female', value: 'f' }
        ]
      }
    }
  };

  config3: QueryBuilderConfig = {
    fields: {
      shopperId: {
        name: 'shopperId',
        type: 'string',
        operators: ['equal']
      }
    }
  }

  config: QueryBuilderConfig = {
    fields: {
      balance: {
        name: 'balance',
        type: 'number',
        operators: [
          'equal', 'less', 'greater', 'greater_or_equal', 'not_equal', 'less_or_equal'
        ],
      },
      account_id: {
        name: 'account_id',
        type: 'number',
        operators: [
          'equal', 'less', 'greater', 'greater_or_equal', 'not_equal', 'less_or_equal'
        ]
      },
      ptype: {
        name: 'ptype',
        type: 'string',
        operators: [
          'equal', 'contains', 'ends_with', 'begins_with', 'not_contains', 'not_equal', 'not_begins_with', 'not_ends_with'
        ]
      },
      amount: {
        name: 'amount',
        type: 'number',
        operators: [
          'equal', 'less', 'greater', 'greater_or_equal', 'not_equal', 'less_or_equal'
        ]
      },
      trans_id: {
        name: 'trans_id',
        type: 'number',
        operators: [
          'equal', 'less', 'greater', 'greater_or_equal', 'not_equal', 'less_or_equal'
        ]
      },
      account: {
        name: 'account',
        type: 'string',
        operators: [
          'equal', 'contains', 'ends_with', 'begins_with', 'not_contains', 'not_equal', 'not_begins_with', 'not_ends_with'
        ]
      },
      date: {
        name: 'date',
        type: 'number',
        operators: [
          'equal', 'less', 'greater', 'greater_or_equal', 'not_equal', 'less_or_equal'
        ]
      },
      bank: {
        name: 'bank',
        type: 'string',
        operators: [
          'equal', 'contains', 'ends_with', 'begins_with', 'not_contains', 'not_equal', 'not_begins_with', 'not_ends_with'
        ]
      },
      operation: {
        name: 'operation',
        type: 'string',
        operators: [
          'equal', 'contains', 'ends_with', 'begins_with', 'not_contains', 'not_equal', 'not_begins_with', 'not_ends_with'
        ]
      },
      k_symbol: {
        name: 'k_symbol',
        type: 'string',
        operators: [
          'equal', 'contains', 'ends_with', 'begins_with', 'not_contains', 'not_equal', 'not_begins_with', 'not_ends_with'
        ]
      }
    }
  };

  rows: any[];

  index: string;

  queryModel = new AssQuery();

  indexes$: Observable<AssIndex[]>;
  aggregations$: Observable<AssAggregation[]>;

  selectedAgg: AssAggregation;

  @ViewChild(QueryBuilderComponent) queryBuilder: QueryBuilderComponent;

  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {
    // TODO: building fields and operators base on anh Thuan's api here
    // fetch data
    this.indexes$ = this.idxService.getIndexes();
    this.aggregations$ = this.aggService.getAggregations();
  }

  fetchAttributes(event) {
    console.log(event.value);
    console.log(this.queryBuilder.value);
    // this.queryModel.query = '';
    // // this.queryBuilder.fields = [];
    // const newCfn = this.idxService.getQueryBuilderConfig(event.value);
    // console.log(newCfn);
    // // this.queryBuilder.config = this.config;
    // this.queryBuilder = new QueryBuilderComponent(new class extends ChangeDetectorRef {
    //   checkNoChanges(): void {
    //   }
    //
    //   detach(): void {
    //   }
    //
    //   detectChanges(): void {
    //   }
    //
    //   markForCheck(): void {
    //   }
    //
    //   reattach(): void {
    //   }
    // });
    // // this.queryBuilder.config = newCfn;
    // this.queryBuilder.fields = newCfn;
    // this.queryBuilder.value = {
    //   condition: 'and',
    //   rules: []
    // };
    // this.queryBuilder.
    // // this.ref.detectChanges();

  }

  runQuery() {
    console.log('clicked');
    this.idxService.getQueryResult(this.lastQuery).subscribe(
      res => {
        let labels = [];
        let data = [];
        const result = res.results;
        const key = Object.keys(result).pop();
        result[key]['buckets'].forEach(element => {
          labels.push(element['key']);
          const k1 = Object.keys(element).shift();
          console.log(element[k1]['value']);
          data.push(element[k1]['value']);
        });

        const chartData = {
          labels: labels,
          datasets: [{
            label: 'dataset1',
            data: data,
          }]
        };

        const ctx = this.canvas.nativeElement.getContext('2d');

        new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  color: '#F7F7F7'
                }
              }],
              yAxes: [{
                stacked: true,
                gridLines: {
                  color: '#F7F7F7'
                },
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
          }
        });
      }
    );
  }

  rebuildRuleSet(rule: RuleSet) {
    let assRules: AssRule[] = [];
    rule.rules.forEach((item) => {
      assRules.push({
        id: item['field'],
        field: item['field'],
        type: 'string',
        operator: item['operator'],
        input: 'text',
        value: item['value']
      })
    });
    let assRS: AssRuleSet = {
      condition: rule.condition.toUpperCase(),
      rules: assRules,
      valid: true
    }
    return assRS;
  }

  ngAfterViewInit(): void {
  }
}
