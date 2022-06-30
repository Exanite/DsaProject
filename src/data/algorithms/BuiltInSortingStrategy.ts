import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const BuiltInSortingStrategy: SortingStrategy = {
  name: "Built In JS Sort",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return collection.sort();
  }
}