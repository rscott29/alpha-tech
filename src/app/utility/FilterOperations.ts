interface EnumFilterOperation { }
export class FilterOperation implements EnumFilterOperation{

  private static AllValues: { [name: string] : FilterOperation } = {};

  static readonly Equals = new FilterOperation(1, "eq");
  static readonly NotEqual = new FilterOperation(2, "neq");
  static readonly GreaterThan = new FilterOperation(3, "gte");
  static readonly LessThan = new FilterOperation(4, "lte");
  static readonly In = new FilterOperation(5, "in");
  static readonly NotIn = new FilterOperation(6, "nin");
  static readonly Between = new FilterOperation(7, "btn");
  static readonly Contains = new FilterOperation(8, "like");
  static readonly IsNull = new FilterOperation(9, "isnull");
  static readonly IsNotNull = new FilterOperation(10, "isnotnull");
  static readonly StartWith= new FilterOperation(11, "startwith");
  static readonly EndWith = new FilterOperation(12, "endwith");
  static readonly IsEmpty = new FilterOperation(13, "isempty");
  static readonly IsNotEmpty = new FilterOperation(14, "isnotempty");
  static readonly Join = new FilterOperation(15, "jn");
  static readonly Is = new FilterOperation(16, "is");

  private constructor(public readonly id: number, public readonly value: string) {
    FilterOperation.AllValues[value] = this;
  }

  public static parseEnum(data: string) : FilterOperation{
    return FilterOperation.AllValues[data];
  }

}
