import { SortingStrategy } from "@/data/interfaces/SortingStrategy";
import { FinanceDataEntry } from "@/data/interfaces/FinanceDataEntry";
import { Comparer } from "@/data/comparers/Comparer";

export interface ProfileScenario {
    name: string,
    key: string,
    comparer: Comparer<FinanceDataEntry>,
    generateData: (elementCount: number) => FinanceDataEntry[],
  }
  
  export interface ProfileResult {
    strategy: SortingStrategy,
    times: number[],
    totalTime: number,
    averageTime: number,
  }