import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const BubbleSortStrategy: SortingStrategy = {
  name: "Bubble Sort",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    let n = collection.length;
    for (let i = 0; i < n - 1; i++) {
      let sorted = true;
      for (let j = 0; j < n - i; j++) {
        if (comparer.compare(collection[j], collection[j + 1]) === 1) {
          let temp = collection[j];
          collection[j] = collection[j + 1];
          collection[j + 1] = temp;
          sorted = false;
        }
      }
      if (sorted) {
        break;
      }
    }
    return collection;
  }
}