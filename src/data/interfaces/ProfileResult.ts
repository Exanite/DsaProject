import { SortingStrategy } from "@/data/interfaces/SortingStrategy";

export interface ProfileResult {
  strategy: SortingStrategy,
  times: number[],
  totalTime: number,
  averageTime: number,
}