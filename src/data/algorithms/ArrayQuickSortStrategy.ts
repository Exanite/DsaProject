import { getMedianOf3PivotIndex, PivotIndexSelector } from "@/data/algorithms/misc/QuickSortPivots";
import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

const arrayQuickSort = <T>(collection: T[], comparer: Comparer, pivotSelector: PivotIndexSelector): T[] => {
  if (collection.length <= 1) {
    return collection;
  }

  const pivotIndex = pivotSelector(collection, 0, collection.length, comparer);
  const pivot = collection[pivotIndex];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < collection.length; i++) {
    if (i == pivotIndex) {
      continue;
    }

    if (comparer.compare(collection[i], pivot) < 0) {
      left.push(collection[i]);
    } else {
      right.push(collection[i]);
    }
  }

  return [...arrayQuickSort(left, comparer, pivotSelector), pivot, ...arrayQuickSort(right, comparer, pivotSelector)];
};

export const ArrayQuickSortStrategy: SortingStrategy = {
  name: "Array Quick Sort with Median of 3 Pivot",
  key: "ArrayQuickSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    return arrayQuickSort(collection, comparer, getMedianOf3PivotIndex);
  },
};