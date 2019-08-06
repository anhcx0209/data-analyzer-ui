import {Component, OnInit} from '@angular/core';
import {QueryBuilderConfig} from 'angular2-query-builder';

@Component({
  selector: 'elastic-query-add',
  templateUrl: './query-add.component.html',
  styleUrls: ['./query-add.component.scss']
})
export class QueryAddComponent implements OnInit {

  query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', value: 'Bob'},
      {field: 'gender', operator: '>=', value: 'm'}
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      }
    }
  };

  rows: any[];

  constructor() {
    this.rows = [
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999},
      {'key': '2019-01-03', 'value': 2.999}
    ];
  }

  ngOnInit() {
  }

}
