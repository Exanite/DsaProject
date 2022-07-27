import { Comparer } from "@/data/comparers/Comparer";

export const isInOrder = <T>(collection: T[], comparer: Comparer): boolean => {
  for (let i = 0; i < collection.length - 1; i++) {
    if (comparer.compare(collection[i], collection[i + 1]) > 0) {
      return false;
    }
  }

  return true;
};