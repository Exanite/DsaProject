import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

const partition = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer): number => {
  const pivot = collection[startIndex];

  let leftIndex = startIndex;
  let rightIndex = endIndex;

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
    for (let i = endIndex; i > startIndex ; i--) {
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

const quickSort = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer): T[] => {
  if (startIndex < endIndex) {
    const pivotIndex = partition(collection, startIndex, endIndex, comparer);

    quickSort(collection, startIndex, pivotIndex - 1, comparer);
    quickSort(collection, pivotIndex + 1, endIndex, comparer);
  }

  return collection;
};

export const QuickSortStrategy: SortingStrategy = {
  name: "Quick Sort",

  sort<T>(collection: T[], comparer: Comparer): T[] {
    return quickSort(collection, 0, collection.length, comparer);
  },
};