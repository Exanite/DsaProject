import { Comparer } from "@/data/comparers/Comparer";

export type PivotIndexSelector = <T>(collection: T[], startIndex: number, endIndex: number, comparer: Comparer) => number;

export const getFirstPivotIndex: PivotIndexSelector = (collection, startIndex) => {
  return startIndex;
};

export const getMedianOf3PivotIndex: PivotIndexSelector = (collection, startIndex, endIndex, comparer) => {
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
};