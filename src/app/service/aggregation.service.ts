import { Injectable } from '@angular/core';
import {AssAggregation} from '../model/ass-aggregation';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  private baseUrl = 'api/aggs';

  constructor(private http: HttpClient) { }

  getAggregations(): Observable<AssAggregation[]> {
    return this.http.get<AssAggregation[]>(this.baseUrl);
  }
}
