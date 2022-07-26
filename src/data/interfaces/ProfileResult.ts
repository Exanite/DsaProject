import { SortStrategy } from "@/data/interfaces/SortStrategy";

export interface ProfileResult {
  strategy: SortStrategy,
  times: number[],
  totalTime: number,
  averageTime: number,
}