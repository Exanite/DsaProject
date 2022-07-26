import { ProfileResult } from "@/data/interfaces/ProfileResult";
import { ProfileScenario } from "@/data/interfaces/ProfileScenario";
import { SortStrategy } from "@/data/interfaces/SortStrategy";

export const profileSortStrategies = (scenario: ProfileScenario, sortStrategies: SortStrategy[], elementCount: number, trialCount: number): ProfileResult[] => {
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