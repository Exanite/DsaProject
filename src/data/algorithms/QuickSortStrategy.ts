import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

type PivotIndexSelector = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer) => number;

const getFirstPivotIndex: PivotIndexSelector = (collection, startIndex) => {
  return startIndex;
};

const getMedianOf3PivotIndex: PivotIndexSelector = (collection, startIndex, endIndex, comparer) => {
  const indexA = startIndex;
  const indexB = Math.floor((startIndex + endIndex - 1) / 2);
  const indexC = endIndex - 1;
  
  const a = collection[indexA];
  const b = collection[indexB];
  const c = collection[indexC];

  comparer.compare(b, a) < 0;

  if (comparer.compare(a, b) > 0) {
    if (comparer.compare(a, c) < 0) {
      return indexA;
    } else if (comparer.compare(b, c) > 0) {
      return indexB;
    } else {
      return indexC;
    }
  } else {
    if (comparer.compare(a, c) > 0) {
      return indexA;
    } else if (comparer.compare(b, c) < 0) {
      return indexB;
    } else {
      return indexC;
    }
  }
};

const getMiddlePivotIndex: PivotIndexSelector = (collection, startIndex, endIndex) => {
  return Math.floor((startIndex + endIndex) / 2);
}

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

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return arrayQuickSort(collection, comparer, getMedianOf3PivotIndex);
  },
};