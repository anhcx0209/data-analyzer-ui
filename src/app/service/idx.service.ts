import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssIndex } from '../model/ass-index';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IdxService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://35.243.224.36:5000/';

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

  getQueryResult(jsonBigObj) {
    const url = this.baseUrl + 'querybuilder/query_and_agg_elastic';
    return this.http.post<any>(url, jsonBigObj);
  }
}
