import { Comparer } from "@/data/comparers/Comparer";

export interface SortingStrategy {
  name: string,
  key: string,
  sort: <T>(collection: T[], comparer: Comparer) => T[];
}