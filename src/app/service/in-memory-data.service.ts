import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {AssAggregation} from '../model/ass-aggregation';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const aggs = [
      {
        id: 1,
        name: 'agg_1',
        content: 'agg_1_content',
        description: 'description_1',
        indexes: [
          'idx_1',
          'idx_2'
        ],
        type: 'line_graph',
        max_time_ranges: '1m',
        status: true,
      },
      {
        id: 2,
        name: 'agg_2',
        content: 'agg_2_content',
        description: 'description_2',
        indexes: [
          'idx_2'
        ],
        type: 'line_graph',
        max_time_ranges: '2m',
        status: true,
      },
      {
        id: 3,
        name: 'agg_3',
        content: 'agg_3_content',
        description: 'description_3',
        indexes: [
          'idx_1',
          'idx_3'
        ],
        type: 'line_graph',
        max_time_ranges: '3m',
        status: true,
      }
    ];

    return {aggs};
  }

  genId(objects: AssAggregation[]): number {
    return objects.length > 0 ? Math.max(...objects.map(item => item.id)) + 1 : 11;
  }
}
