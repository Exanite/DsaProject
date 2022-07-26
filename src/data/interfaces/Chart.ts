import { ProfileScenario } from "@/data/interfaces/ProfileScenario";

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