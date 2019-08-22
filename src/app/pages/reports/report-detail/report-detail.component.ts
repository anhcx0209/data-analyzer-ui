import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
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
    user_demographic: 18,
    os_name: 'windows'
  };

  @ViewChild('canvas') canvas: ElementRef;

  ruleOsName = { id: 'metrics.os_name', field: 'metrics.os_name', type: 'string', input: 'text', operator: 'equal', value: 'windows' };
  ruleDemog = { id: 'user_demographic', field: 'user_demographic', type: 'integer', input: 'number', operator: 'equal', value: 18 };

  chart: any;

  modelRules = {
    condition: 'AND',
    rules: [
      this.ruleOsName,
      // this.ruleDemog,
    ]
  };

  buildRules() {
    if (this.modFields.os_name !== '') {
      this.ruleOsName.value = this.modFields.os_name;
    }
    // if (this.modFields.user_demographic > 0) {
    //   this.ruleDemog.value = this.modFields.user_demographic;
    // }
  }

  runQuery() {
    if (this.chart) {
      this.chart.destroy();
      const ctx0 = this.canvas.nativeElement.getContext('2d');
      ctx0.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
    this.buildRules();
    const jsonData = {
      index: 'test_user_data',
      query: this.modelRules,
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

    console.log(jsonData);

    this.idxService.getQueryResult(jsonData).subscribe(
      res => {
        console.log(res);
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
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = [+params.get('reportId')];
      console.log(id);
    });
    this.runQuery();
  }
}
