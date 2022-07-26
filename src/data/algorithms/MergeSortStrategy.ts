import { SortingStrategy } from "@/data/interfaces/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";

function merge<T>(collection: T[], comparer: Comparer, left: number, mid: number, right: number) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  let X = new Array(n1);
  let Y = new Array(n2);
  for (let i = 0; i < n1; i++) {
    X[i] = collection[left + i];
  }
  for (let j = 0; j < n2; j++) {
    Y[j] = collection[mid + 1 + j];
  }
  
  let i, j, k;
  i = 0;
  j = 0;
  k = left;
  
  while (i < n1 && j < n2) {
    if (comparer.compare(X[i], Y[j]) === -1 || (comparer.compare(X[i], Y[j]) === 0 && !comparer.descending)) {
      collection[k] = X[i];
      i++;
    }
    else {
      collection[k] = Y[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    collection[k] = X[i];
    i++;
    k++;
  }
  while (j < n2) {
    collection[k] = Y[j];
    j++;
    k++;
  }
}
function mergeSort<T>(collection:T[], comparer: Comparer, start: number, end: number) {
  if (start < end) {
    let middle = Math.floor((start + end) / 2);
    mergeSort(collection, comparer, start, middle);
    mergeSort(collection, comparer, middle + 1, end);
    merge(collection, comparer, start, middle, end);
  }
}
export const MergeSortStrategy: SortingStrategy = {
  name: "Merge Sort",
  key: "MergeSortStrategy",
  sort<T>(collection: T[], comparer: Comparer): T[] {
    mergeSort(collection, comparer, 0, collection.length - 1);
    return collection;
  }
}