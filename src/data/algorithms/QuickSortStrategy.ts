import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

type PivotSelector = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer) => T;

const getFirstPivot: PivotSelector = (collection, startIndex) => {
  return collection[startIndex];
};

const getMedianOf3Pivot: PivotSelector = (collection, startIndex, endIndex, comparer) => {
  const a = collection[startIndex];
  const b = collection[Math.floor((startIndex + endIndex - 1) / 2)];
  const c = collection[endIndex - 1];

  comparer.compare(b, a) < 0;

  if (comparer.compare(a, b) > 0) {
    if (comparer.compare(a, c) < 0) {
      return a;
    } else if (comparer.compare(b, c) > 0) {
      return b;
    } else {
      return c;
    }
  } else {
    if (comparer.compare(a, c) > 0) {
      return a;
    } else if (comparer.compare(b, c) < 0) {
      return b;
    } else {
      return c;
    }
  }
};

const partition = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotSelector): number => {
  const pivot = pivotSelector(collection, startIndex, endIndex, comparer);

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

const quickSort = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotSelector): T[] => {
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
    return quickSort(collection, 0, collection.length, comparer, getFirstPivot);
  },
};

export const QuickSortMedianOf3Strategy: SortingStrategy = {
  name: "Quick Sort with Median of 3 Pivot",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer, getMedianOf3Pivot);
  },
};