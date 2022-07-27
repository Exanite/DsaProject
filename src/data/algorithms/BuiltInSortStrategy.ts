import { Comparer } from "@/data/comparers/Comparer";
import { SortStrategy } from "@/data/interfaces/SortStrategy";

export const BuiltInSortStrategy: SortStrategy = {
  name: "JS Built-in Sort",
  key: "BuiltInSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    return collection.sort(comparer.compare.bind(comparer));
  },
};