import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const BuiltInSortingStrategy: SortingStrategy = {
  name: "JS Built-in Sort",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return collection.sort(comparer.compare.bind(comparer));
  }
}