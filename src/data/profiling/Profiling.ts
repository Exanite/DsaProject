import { SortingStrategy } from "@/data/interfaces/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";
import { FinanceDataEntry } from "@/data/FinanceData";

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

export const profileSortStrategies = (scenario: ProfileScenario, sortStrategies: SortingStrategy[], elementCount: number, trialCount: number): ProfileResult[] => {
  const results: ProfileResult[] = [];

  for (const sortStrategy of sortStrategies) {
    const result: ProfileResult = {
      strategy: sortStrategy,
      times: [],
      totalTime: 0,
      averageTime: 0,
    };

    for (let i = 0; i < trialCount; i++) {
      const data = scenario.generateData(elementCount);

      const startTime = performance.now();
      sortStrategy.sort(data, scenario.comparer);
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      result.times.push(elapsedTime);
      result.totalTime += elapsedTime;
    }

    result.averageTime = result.totalTime / result.times.length;

    results.push(result);
  }

  return results;
};