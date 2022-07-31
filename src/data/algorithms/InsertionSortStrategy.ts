import { Comparer } from "@/data/comparers/Comparer";
import { SortStrategy } from "@/data/interfaces/SortStrategy";

export const InsertionSortStrategy: SortStrategy = {
  name: "Insertion Sort",
  key: "InsertionSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    for (var j = 1; j < collection.length; j++) {
      var current = collection[j];
      var i = j - 1;
      while (i >= 0 && comparer.compare(current, collection[i]) < 0) {
        collection[i + 1] = collection[i];
        collection[i] = current;
        i--;
      }
    }

    return collection;
  },
};