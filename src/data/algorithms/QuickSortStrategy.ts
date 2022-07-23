import { getFirstPivotIndex, getMedianOf3PivotIndex, PivotIndexSelector } from "@/data/algorithms/misc/QuickSortPivots";
import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

const partition = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotIndexSelector): number => {
  const pivot = collection[pivotSelector(collection, startIndex, endIndex, comparer)];

  let leftIndex = startIndex;
  let rightIndex = endIndex - 1;

  while (leftIndex < rightIndex) {
    // Narrow from left to right
    for (let i = leftIndex; i < endIndex; i++) {
      // Stop at first left value that is out of place
      if (comparer.compare(collection[leftIndex], pivot) > 0) {
        break;
      }

      leftIndex++;
    }

    // Narrow from right to left
    for (let i = endIndex - 1; i > startIndex; i--) {
      // Stop at first right value that is out of place
      if (comparer.compare(collection[rightIndex], pivot) < 0) {
        break;
      }

      rightIndex--;
    }

    if (leftIndex < rightIndex) {
      // Swap the two out of place values
      const temp = collection[leftIndex];
      collection[leftIndex] = collection[rightIndex];
      collection[rightIndex] = temp;
    }
  }

  // Swap pivot into place
  const temp = collection[startIndex];
  collection[startIndex] = collection[rightIndex];
  collection[rightIndex] = temp;

  return rightIndex;
};

const quickSort = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotIndexSelector): T[] => {
  if (startIndex < endIndex) {
    const pivotIndex = partition(collection, startIndex, endIndex, comparer, pivotSelector);

    quickSort(collection, startIndex, pivotIndex, comparer, pivotSelector);
    quickSort(collection, pivotIndex + 1, endIndex, comparer, pivotSelector);
  }

  return collection;
};

export const QuickSortFirstStrategy: SortingStrategy = {
  name: "Quick Sort with First Element as Pivot",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer, getFirstPivotIndex);
  },
};

export const QuickSortMedianOf3Strategy: SortingStrategy = {
  name: "Quick Sort with Median of 3 Pivot",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer, getMedianOf3PivotIndex);
  },
};