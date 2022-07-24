import { getFirstPivotIndex, getMedianOf3PivotIndex, getMiddlePivotIndex, PivotIndexSelector } from "@/data/algorithms/misc/QuickSortPivots";
import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

const partition = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer, pivotSelector: PivotIndexSelector): number => {
  let temp;
  const pivotIndex = pivotSelector(collection, startIndex, endIndex, comparer);
  const pivot = collection[pivotIndex];

  // console.log(`Starting with Start ${startIndex} - End ${endIndex}`);
  // console.log(JSON.stringify(collection));

  temp = collection[startIndex];
  collection[startIndex] = collection[pivotIndex];
  collection[pivotIndex] = temp;
  
  // console.log(`Swapped Pivot ${pivotIndex} with Start ${startIndex}`);
  // console.log(JSON.stringify(collection));
  
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

      // console.log(`Swapped ${leftIndex} with ${rightIndex}`);
      // console.log(JSON.stringify(collection));
    }
  }

  temp = collection[rightIndex];
  collection[rightIndex] = collection[startIndex];
  collection[startIndex] = temp;

  // console.log("Swapped pivot into final place");
  // console.log(`Left ${leftIndex} - Right ${rightIndex}`);
  // console.log("Ending");
  // console.log(JSON.stringify(collection));
  
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

// const collection = [8,4,2,7,6,5,9,1,0,3]
// console.log(quickSort(collection, 0, collection.length, new Comparer(x => x), getFirstPivotIndex));

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