export const DEMO_AGGREGATIONS = [
  {
    'id': 10001,
    'name': 'sample_line_graph',
    'description': 'Count the unique number of accounts by date',
    'content': '{ "2": { "terms": { "field": "date", "size": 1000 }, "aggs": { "3": { "cardinality": { "field": "account_id" } } } } }',
    'indexes': ['test_trans'],
    'type': 'line_graph',
    'max_time_ranges': '1m',
    'status': true
  },
  {
    'id': 10002,
    'name': 'sample_horizontal_columns',
    'description': 'Count the unique number of accounts by keywords',
    'content': '{ "2": { "terms": { "field": "ptype.keyword", "size": 1000 }, "aggs": { "3": { "cardinality": { "field": "account_id" } } } } }',
    'indexes': ['test_trans'],
    'type': 'horizontal_columns',
    'max_time_ranges': '1m',
    'status': true
  },
  {
    'id': 10003,
    'name': 'sample_line_graph',
    'description': 'ShopperId',
    'content': '{ "group_by_shopperId": { "terms": { "field": "shopperId" }, "aggs": { "Metric_Op": { "max": { "field": "createTime" } }, "op_value": { "bucket_selector": { "buckets_path": { "val": "Metric_Op" }, "script": "params.val > 1000" } } } } }',
    'indexes': ['answers'],
    'type': 'line_graph',
    'max_time_ranges': '1m',
    'status': true
  }
];
