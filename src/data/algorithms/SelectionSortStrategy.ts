import { SortStrategy } from "@/data/interfaces/SortStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const SelectionSortStrategy: SortStrategy = {
  name: "Selection Sort",
  key: "SelectionSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    
    for (let i = 0; i < collection.length; i++) {
      let min = i;
      for (let j = i+1; j < collection.length; j++) {
        if (comparer.compare(collection[j], collection[min]) === -1) {
          min = j;
        }
      }
      
      let temp = collection[min];
      collection[min] = collection[i];
      collection[i] = temp;
    }
    return collection;
  }
}