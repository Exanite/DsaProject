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
export class Comparer {
  constructor(
    public path: string[],
  ) {
  }
  
  public compare(left: any, right: any): -1 | 0 | 1 {
    const leftValue = this.getValue(left);
    const rightValue = this.getValue(right);

    console.log(leftValue);
    console.log(rightValue);
    
    if (leftValue == rightValue || leftValue == undefined || rightValue == undefined) {
      return 0;
    }
    
    return leftValue < rightValue ? -1 : 1;
  }
  
  private getValue(entry: any): {} | undefined {
    let current = entry;
    for (const key of this.path) {
      current = current[key];
      
      if (current == undefined) {
        return undefined;
      }
    }
    
    return current;
  }
}