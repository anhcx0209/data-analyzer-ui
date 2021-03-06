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
    'description': 'Get number users group by week days',
    'content': '{ "3": { "histogram": { "script": { "source": "LocalDateTime.ofInstant(doc[\'event_date\'].value.toInstant(), ZoneId.of(\'GMT+7\')).getDayOfWeek().getValue()", "lang": "painless" }, "interval": 1, "min_doc_count": 1 }, "aggs": { "2": { "cardinality": { "field": "browser_id_hash" } } } } }',
    'indexes': ['test_user_data'],
    'type': 'line_graph',
    'max_time_ranges': '1m',
    'status': true
  }
];
