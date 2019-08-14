import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AssIndex} from '../model/ass-index';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdxService {

  private baseUrl = 'http://35.243.224.36:5000/';

  constructor(
    private http: HttpClient
  ) {
  }

  getIndexes(): Observable<AssIndex[]> {
    const url = this.baseUrl + 'querybuilder/master_file/index';
    return this.http.get<Observable<any>>(url).pipe(
      map(obj => obj.indices)
    );
  }
}
