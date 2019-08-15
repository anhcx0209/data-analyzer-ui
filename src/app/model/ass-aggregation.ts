export class AssAggregation {
  id: number;
  name: string;
  description: string;
  content: string;
  indexes: string[];
  type: string;
  max_time_ranges: string;
  status: boolean; // TODO: make it make sense

  constructor(agg) {
    this.id = agg.id;
    this.name = agg.name;
    this.description = agg.description;
    this.content = agg.content;
    this.indexes = agg.indexes;
    this.type = agg.type;
    this.max_time_ranges = agg.max_time_ranges;
    this.status = true;
  }
}
