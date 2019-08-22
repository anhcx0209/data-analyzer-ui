import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js';
import { IdxService } from 'app/service/idx.service';

@Component({
  selector: 'elastic-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private idxService: IdxService) { }

  report;

  modFields = {
    brand: '',
    user_demographic: '',
    os_name: ''
  };

  @ViewChild('canvas') canvas: ElementRef;

  modelQuery = {
    condition: 'AND',
    rules: [
      { id: 'os_name', field: 'os_name', type: 'string', input: 'text', operator: 'equal', value: 'windows' },
      { id: 'user_demographic', field: 'user_demographic', type: 'integer', input: 'number', operator: 'equal', value: 30 },
      { id: 'brand', field: 'brand', type: 'string', input: 'text', operator: 'equal', value: 'samsung' }
    ]
  };

  buildRule() {
    console.log('hello');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = [+params.get('reportId')];
      console.log(id);
    });

    const jsonData = {
      index: 'coccoc_users',
      query: this.modelQuery,
      agg: {
        aggs: {
          '3': {
            'histogram': {
              'script': {
                'source': 'LocalDateTime.ofInstant(doc[\'event_date\'].value.toInstant(), ZoneId.of(\'GMT+7\')).getDayOfWeek().getValue()',
                'lang': 'painless'
              },
              'interval': 1,
              'min_doc_count': 1
            },
            'aggs': {
              '2': {
                'cardinality': {
                  'field': 'browser_id_hash'
                }
              }
            }
          }
        }
      }
    };

    if (jsonData.query === null) {
      jsonData.query = {
        condition: 'AND',
        rules: []
      };
    }

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
  }

}
