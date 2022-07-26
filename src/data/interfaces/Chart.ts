import { ProfileScenario } from "@/data/profiling/Profiling";

export interface Chart {
    labels: string[];
    datasets: {
      label: string[];
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      }[];
      metadata: {
        scenario: ProfileScenario;
        elementCount: number;
        trialCount: number;
      };
    }