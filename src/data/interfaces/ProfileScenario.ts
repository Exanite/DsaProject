import { Comparer } from "@/data/comparers/Comparer";
import { FinanceDataEntry } from "@/data/interfaces/FinanceDataEntry";

export interface ProfileScenario {
  name: string,
  key: string,
  comparer: Comparer<FinanceDataEntry>,
  generateData: (elementCount: number) => FinanceDataEntry[],
}