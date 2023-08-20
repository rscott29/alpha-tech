interface EnumFilterQueries { }
export class FilterQuery implements EnumFilterQueries {

  private static AllValues: { [name: string] : FilterQuery } = {};

  static readonly FilterAnd = new FilterQuery(1, "filterAnd");
  static readonly FilterOr = new FilterQuery(2, "filterOr");
  static readonly Orders = new FilterQuery(3, "orders");
  static readonly Page = new FilterQuery(4, "page");
  static readonly Size = new FilterQuery(5, "size");

  private constructor(public readonly id: number, public readonly value: string) {
    FilterQuery.AllValues[value] = this;
  }

  public static parseEnum(data: string) : FilterQuery{
    return FilterQuery.AllValues[data];
  }

}
