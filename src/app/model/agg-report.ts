export class AggReport {
  id: number;
  name: string;
  jsonQuery: string;
  graphType: string;
  modifiableFields: string;
  aggregationContent: string[];
  fullQueryContent: string;

  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.jsonQuery = obj.jsonQuery;
    this.graphType = obj.graphType;
    this.modifiableFields = obj.modifiableFields;
    this.aggregationContent = obj.aggregationContent;
    this.fullQueryContent = obj.fullQueryContent;
  }
}
