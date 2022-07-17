export class Comparer {
  constructor(
    public getValue: (object: any) => any,
    public descending: boolean = false,
  ) {
  }

  public compare(left: any, right: any): -1 | 0 | 1 {
    const leftValue = this.getValue(left);
    const rightValue = this.getValue(right);

    if (leftValue == rightValue || leftValue == undefined || rightValue == undefined) {
      return 0;
    }

    if (this.descending) {
      return leftValue > rightValue ? -1 : 1;
    } else {
      return leftValue < rightValue ? -1 : 1;
    }
  }
}