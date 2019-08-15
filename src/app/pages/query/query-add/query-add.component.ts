import {Component, OnInit} from '@angular/core';
import {QueryBuilderConfig} from 'angular2-query-builder';
import {Field} from 'angular2-query-builder/dist/components/query-builder/query-builder.interfaces';

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
      gender: {
        name: 'shoppers.validFields.gender',
        type: 'string',
        operators: [
          'not_equal',
          'begins_with',
          'ends_with',
          'not_ends_with',
          'is_null',
          'equal',
          'is_not_null',
          'not_begins_with',
          'contains',
          'not_contains',
        ]
      },
      age: {name: 'Age', type: 'number'}
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

  get sneakQueryJson() {
    return JSON.stringify(this.query);
  }

  ngOnInit() {
  }

}
