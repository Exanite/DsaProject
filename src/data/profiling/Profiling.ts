import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";
import { FinanceDataEntry } from "@/data/FinanceData";

interface Scenario {
  name: string,
  key: string,
  comparer: Comparer,
  generateData: (elementCount: number) => FinanceDataEntry[],
}

interface ProfileResult {
  strategy: SortingStrategy,
  times: number[],
}

const profileSortStrategies = (scenario: Scenario, sortStrategies: SortingStrategy[], elementCount: number, trialCount: number): ProfileResult[] => {
  const results: ProfileResult[] = [];

  const originalData = scenario.generateData(elementCount);

  for (const sortStrategy of sortStrategies) {
    const result: ProfileResult = {
      strategy: sortStrategy,
      times: [],
    }
    
    for (let i = 0; i < trialCount; i++) {
      // Not a deep clone because sorts shouldn't modify element data
      const clonedData = [...originalData];

      const startTime = performance.now();
      sortStrategy.sort(clonedData, scenario.comparer);
      const endTime = performance.now();
      
      result.times.push(endTime - startTime);
    }
    
    results.push(result);
  }
  
  return results;
}