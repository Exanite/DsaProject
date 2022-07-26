import { SortStrategy } from "@/data/interfaces/SortStrategy";
import { Comparer } from "@/data/comparers/Comparer";

export const BuiltInSortStrategy: SortStrategy = {
  name: "JS Built-in Sort",
  key: "BuiltInSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    return collection.sort(comparer.compare.bind(comparer));
  }
}