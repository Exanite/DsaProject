import { getFirstPivotIndex, getMedianOf3PivotIndex, PivotIndexSelector } from "@/data/algorithms/misc/QuickSortPivots";
import { Comparer } from "@/data/comparers/Comparer";
import { SortStrategy } from "@/data/interfaces/SortStrategy";

const partition = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotIndexSelector): number => {
  let temp;
  const pivotIndex = pivotSelector(collection, startIndex, endIndex, comparer);
  const pivot = collection[pivotIndex];

  temp = collection[startIndex];
  collection[startIndex] = collection[pivotIndex];
  collection[pivotIndex] = temp;

  let leftIndex = startIndex + 1;
  let rightIndex = endIndex - 1;

  while (leftIndex <= rightIndex) {
    if (comparer.compare(collection[leftIndex], pivot) < 0) {
      leftIndex++;

      continue;
    }

    if (comparer.compare(collection[rightIndex], pivot) >= 0) {
      rightIndex--;

      continue;
    }

    if (leftIndex < rightIndex) {
      temp = collection[leftIndex];
      collection[leftIndex] = collection[rightIndex];
      collection[rightIndex] = temp;
    }
  }

  temp = collection[rightIndex];
  collection[rightIndex] = collection[startIndex];
  collection[startIndex] = temp;

  return rightIndex;
};

const quickSort = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotIndexSelector): T[] => {
  if (startIndex >= endIndex) {
    return collection;
  }

  const pivotIndex = partition(collection, startIndex, endIndex, comparer, pivotSelector);

  quickSort(collection, startIndex, pivotIndex, comparer, pivotSelector);
  quickSort(collection, pivotIndex + 1, endIndex, comparer, pivotSelector);

  return collection;
};

export const QuickSortFirstStrategy: SortStrategy = {
  name: "Quick Sort with First Element Pivot",
  key: "QuickSortFirstStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer, getFirstPivotIndex);
  },
};

export const QuickSortMedianOf3Strategy: SortStrategy = {
  name: "Quick Sort with Median of 3 Pivot",
  key: "QuickSortMedianOf3Strategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer, getMedianOf3PivotIndex);
  },
};