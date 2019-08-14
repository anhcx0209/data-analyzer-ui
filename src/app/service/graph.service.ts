import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AssGraph} from '../model/ass-graph';
import {GRAPHS} from '../model/mock-agg-graphs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() {
  }

  getGraphs(): Observable<AssGraph[]> {
    return of(GRAPHS);
  }
}
