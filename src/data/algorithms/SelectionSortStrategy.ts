import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const SelectionSortStrategy: SortingStrategy = {
  name: "Selection Sort",
  key: "SelectionSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    
    for (let i = 0; i < collection.length - 1; i++) {
      let min = i;
      for (let j = i+1; j < collection.length; j++) {
        if (comparer.compare(collection[j], collection[min]) === -1) {
          min = j;
        }
        let temp = collection[min];
        collection[min] = collection[i];
        collection[i] = temp;
      }
    }
    return collection;
  }
}