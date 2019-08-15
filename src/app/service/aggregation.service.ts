import { Injectable } from '@angular/core';
import { AssAggregation } from '../model/ass-aggregation';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DEMO_AGGREGATIONS } from 'app/model/ass-aggregations.demo';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  // TODO: use http to fetch Aggregations here....
  constructor(private http: HttpClient) { }

  getAggregations(): Observable<AssAggregation[]> {
    return of(DEMO_AGGREGATIONS);
  }
}
