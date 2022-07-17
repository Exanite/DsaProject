import { FinanceDataEntry } from "@/data/FinanceData";
import { ValidStates } from "@/data/State";

// Min inclusive, max exclusive
const getRandomInteger = (min: number = 0, max: number = 100000000): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export class DataGenerator {
  public generateCollection(count: number): FinanceDataEntry[] {
    const results = [];

    for (let i = 0; i < count; i++) {
      results.push(this.generate());
    }

    return results;
  }

  public generate(): FinanceDataEntry {
    return {
      state: ValidStates[getRandomInteger(0, ValidStates.length)],
      year: getRandomInteger(1992, 2009 + 1),
      totals: {
        capitalOutlay: getRandomInteger(),
        revenue: getRandomInteger(),
        generalRevenue: getRandomInteger(),
        expenditure: getRandomInteger(),
        generalExpenditure: getRandomInteger(),
        insuranceTrustRevenue: getRandomInteger(),
        intergovernmental: getRandomInteger(),
        licenseTax: getRandomInteger(),
        selectiveSalesTax: getRandomInteger(),
        tax: getRandomInteger(),
        debtEndOfFiscalYear: getRandomInteger(),
      },
      details: {
        correction: {
          correctionTotal: getRandomInteger(),
        },
        education: {
          educationTotal: getRandomInteger(),
        },
        financialAid: {
          assistanceAndSubsidies: getRandomInteger(),
          cashAndSecuritiesTotal: getRandomInteger(),
        },
        health: {
          healthTotalExpenditure: getRandomInteger(),
        },
        intergovernmental: {
          intergovernmentalCombinedAndUnallocable: getRandomInteger(),
          intergovernmentalExpenditure: getRandomInteger(),
        },
        naturalResources: {
          parksTotalExpenditure: getRandomInteger(),
          naturalResourcesConstruction: getRandomInteger(),
        },
        utilities: {
          utilitiesCurrentOperation: getRandomInteger(),
        },
        welfare: {
          welfareInstitutionTotalExpenditure: getRandomInteger(),
        },
        transporation: {
          highwaysTotalExpenditure: getRandomInteger(),
        },
        insuranceBenefitsAndRepayments: getRandomInteger(),
        interestOnDebt: getRandomInteger(),
        interestOnGeneralDebt: getRandomInteger(),
        miscellaneousGeneralRevenue: getRandomInteger(),
        otherTaxes: getRandomInteger(),
        policeProtection: getRandomInteger(),
      },
    };
  }
}