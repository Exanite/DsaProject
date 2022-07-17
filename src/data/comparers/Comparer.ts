/**
 * Generic way to compare an object's properties by traversing an
 * object using the given path and compares the properties found.
 *
 * Note: Providing an empty path compares the root objects.
 *
 * @example
 * const comparer = new Comparer(["totals", "capitalOutlay"]);
 * comparer.compare(a, b);
 */
import { getValueByPath } from "@/data/Utility";

export class Comparer {
  constructor(
    public path: string[],
    public descending: boolean = false,
  ) {
  }

  public compare(left: any, right: any): -1 | 0 | 1 {
    const leftValue = getValueByPath(left, this.path);
    const rightValue = getValueByPath(right, this.path);

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