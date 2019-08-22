import { Component, OnInit, ViewChild, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { IdxService } from 'app/service/idx.service';
import { AssQuery } from 'app/model/ass-query';
import { Observable } from 'rxjs';
import Chart from 'chart.js';
import { AssIndex } from '../../../model/ass-index';
import { AssAggregation } from '../../../model/ass-aggregation';
import { AggregationService } from '../../../service/aggregation.service';
import { uniqBy } from 'lodash-es';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
declare var $: any;

interface QBFilter {
  id: string;
  field: string;
  type: string;
  label?: string;
  operators?: Array<any>;
}

@Component({
  selector: 'elastic-query-add',
  templateUrl: './query-add.component.html',
  styleUrls: ['./query-add.component.scss']
})
export class QueryAddComponent implements OnInit {

  rows: any[];

  index: string;

  queryModel = new AssQuery();

  indexes$: Observable<AssIndex[]>;
  aggregations$: Observable<AssAggregation[]>;
  modifiableFields = [
    {
      id: 'brand',
      name: 'brand'
    },
    {
      id: 'user_demographic',
      name: 'user_demographic'
    },
    {
      id: 'os_name',
      name: 'os_name'
    }
  ];

  selectedAgg: AssAggregation = null;

  chart: any;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('validateSwal') private validateSwal: SwalComponent;

  constructor(private idxService: IdxService,
    private aggService: AggregationService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }


  ngOnInit() {
    this.indexes$ = this.idxService.getIndexes();
    this.aggregations$ = this.aggService.getAggregations();
  }

  get postDataObject() {
    return {
      index: this.queryModel.index_type,
      query: this.getRules(),
      aggs: this.getAggs(),
    };
  }

  newQueryBuilder(newFilters: Array<QBFilter>) {
    $(document).ready(function () {
      $('#query-builder').queryBuilder('destroy');
      $('#query-builder').queryBuilder({
        filters: newFilters,
        allow_empty: true,
        display_empty_filter: false
      });
    });
  }

  getRules() {
    try {
      const result = $('#query-builder').queryBuilder('getRules');
      return result;
    } catch (error) {
      return undefined;
    }
  }

  getAggs() {
    return this.selectedAgg ? JSON.parse(this.selectedAgg.content) : undefined;
  }

  fetchAttributes(event) {
    this.idxService.getAttributes(event.value).subscribe(
      res => {
        const uniqRes = uniqBy<QBFilter>(res, 'id');
        this.newQueryBuilder(uniqRes);
      }
    );
  }

  validateQuery(): boolean {
    let ret = false;
    if (this.queryModel.hasOwnProperty('name') && this.selectedAgg !== null && this.queryModel.hasOwnProperty('index_type')) {
      ret = true;
    }
    return ret;
  }

  runQuery() {
    // clear old query first
    if (this.chart) {
      this.chart.destroy();
      const ctx0 = this.canvas.nativeElement.getContext('2d');
      ctx0.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
    const validated = this.validateQuery();
    console.log(validated);
    const q = this.getRules();
    const k = q.rules.map(item => {
      if (item.id === 'os_name') {
        return {
          id: 'metrics.os_name',
          field: 'metrics.os_name',
          type: item.type,
          input: item.input,
          value: item.value,
          operator: item.operator,
        };
      } else {
        return item;
      }
    });
    if (validated) {
      const jsonData = {
        index: this.queryModel.index_type,
        query: {
          condition: q.condition,
          rules: k
        },
        agg: {
          aggs: this.selectedAgg ? JSON.parse(this.selectedAgg.content) : '{}'
        }
      };

      if (jsonData.query === null) {
        jsonData.query = {
          condition: 'AND',
          rules: []
        };
      }

      console.log(jsonData);
      console.log(JSON.stringify(jsonData));

      this.idxService.getQueryResult(jsonData).subscribe(
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
              // fill: false,
              label: 'line',
              lineTension: 0,
              borderColor: '#2ae866',
              data: data,
            }]
          };

          const ctx = this.canvas.nativeElement.getContext('2d');

          this.chart = new Chart(ctx, {
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
              elements: {
                line: {
                  tension: 0 // disables bezier curves
                }
              },
              tooltips: {
                mode: 'index',
                intersect: false
              },
            }
          });
        }
      );
    } else {
      this.validateSwal.show();
    }
  }
}
