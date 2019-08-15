import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssIndex } from '../model/ass-index';
import { map } from 'rxjs/operators';
import { Field, QueryBuilderConfig } from 'angular2-query-builder';
import { forEach } from 'lodash-es';
import { FieldMap } from 'angular2-query-builder/dist/components';
import { assertLessThan } from '@angular/core/src/render3/assert';

@Injectable({
  providedIn: 'root'
})
export class IdxService {

  constructor(
    private http: HttpClient
  ) {
  }

  private baseUrl = 'http://35.243.224.36:5000/';

  fieldMap: FieldMap;

  getIndexes(): Observable<AssIndex[]> {
    const url = this.baseUrl + 'querybuilder/master_file/index';
    return this.http.get<any>(url).pipe(
      map(obj => obj.indices)
    );
  }

  getAttributes(index): Observable<any> {
    const url = this.baseUrl + 'querybuilder/master_file/attribute/' + index;
    return this.http.get<any>(url).pipe(
      map(obj => obj.attributes)
    );
  }

  getQueryBuilderConfig(index) {
    // building config
    const url = this.baseUrl + 'querybuilder/master_file/attribute/' + index;

    var fieldMap: FieldMap = {};
    var arr: Field[] = [];

    this.http.get<any>(url).subscribe(
      res => {
        res.attributes.forEach((item) => {
          const key = item.id;
          fieldMap[key] = {
            name: item.label,
            type: item.type
            // operators:
          };
          arr.push({
            name: item.label,
            type: item.type
            // operators:
          });
        });
      }
    );
    const builderConfig: QueryBuilderConfig = {
      fields: fieldMap
    };
    return arr;
  }

  getQueryResult(jsonBigObj) {
    const url = this.baseUrl + 'querybuilder/query_and_agg_elastic';
    return this.http.post<any>(url, jsonBigObj);
  }
}
