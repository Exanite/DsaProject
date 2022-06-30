import cleanedData from "@/assets/finance_cleaned.json";
import { State, ValidStates } from "@/data/State";

// Data is from https://think.cs.vt.edu/corgis/json/finance/

export interface FinanceDataEntry {
  state: State,
  year: number,
  totals: {
    capitalOutlay: number,
    revenue: number,
    generalRevenue: number,
    expenditure: number,
    generalExpenditure: number
    insuranceTrustRevenue: number,
    intergovernmental: number,
    licenseTax: number,
    selectiveSalesTax: number,
    tax: number,
    debtEndOfFiscalYear: number,
  },
  details: {
    correction: {
      correctionTotal: number
    },
    education: {
      educationTotal: number
    },
    financialAid: {
      assistanceAndSubsidies: number,
      cashAndSecuritiesTotal: number
    },
    health: {
      healthTotalExpenditure: number
    },
    intergovernmental: {
      intergovernmentalCombinedAndUnallocable: number,
      intergovernmentalExpenditure: number
    },
    naturalResources: {
      parksTotalExpenditure: number,
      naturalResourcesConstruction: number
    },
    utilities: {
      utilitiesCurrentOperation: number
    },
    welfare: {
      welfareInstitutionTotalExpenditure: number
    },
    transporation: {
      highwaysTotalExpenditure: number
    },
    insuranceBenefitsAndRepayments: number,
    interestOnDebt: number,
    interestOnGeneralDebt: number,
    miscellaneousGeneralRevenue: number
    otherTaxes: number,
    policeProtection: number,
  },
}

export const FinanceData: FinanceDataEntry[] = cleanedData as any;

/**
 * Data transformation function used to clean up original data
 */
function query(data: any[]) {
  return data.map(d => {
    return {
      state: d["State"],
      year: d["Year"],
      totals: {
        capitalOutlay: d["Totals"]["Capital outlay"],
        revenue: d["Totals"]["Revenue"],
        expenditure: d["Totals"]["Expenditure"],
        generalExpenditure: d["Totals"]["General expenditure"],
        generalRevenue: d["Totals"]["General revenue"],
        insuranceTrustRevenue: d["Totals"]["Insurance trust  revenue"],
        intergovernmental: d["Totals"]["Intergovernmental"],
        licenseTax: d["Totals"]["License tax"],
        selectiveSalesTax: d["Totals"]["Selective sales tax"],
        tax: d["Totals"]["Tax"],
        debtEndOfFiscalYear: d["Totals"][" Debt at end of fiscal year"],
      },
      details: {
        correction: {
          correctionTotal: d["Details"]["Correction"]["Correction Total"],
        },
        education: {
          educationTotal: d["Details"]["Education"]["Education Total"],
        },
        financialAid: {
          assistanceAndSubsidies: d["Details"]["Financial Aid"]["Assistance and Subsidies"],
          cashAndSecuritiesTotal: d["Details"]["Financial Aid"]["Cash and Securities Total"],
        },
        health: {
          healthTotalExpenditure: d["Details"]["Health"]["Health Total Expenditure"],
        },
        intergovernmental: {
          intergovernmentalExpenditure: d["Details"]["Intergovernmental"]["Intergovernmental Expenditure"],
          intergovernmentalCombinedAndUnallocable: d["Details"]["Intergovernmental"]["Intergovernmental to Combined and Unallocable"],
        },
        naturalResources: {
          naturalResourcesConstruction: d["Details"]["Natural Resources"]["Natural Resources Construction"],
          parksTotalExpenditure: d["Details"]["Natural Resources"]["Parks"]["Parks Total Expenditure"],
        },
        utilities: {
          utilitiesCurrentOperation: d["Details"]["Utilities"]["Utilities Current Operation"],
        },
        welfare: {
          welfareInstitutionTotalExpenditure: d["Details"]["Welfare"]["Welfare Institution Total Expenditure"],
        },
        transporation: {
          highwaysTotalExpenditure: d["Details"]["Transportation"]["Highways"]["Highways Total Expenditure"],
        },
        insuranceBenefitsAndRepayments: d["Details"]["Insurance benefits and repayments"],
        interestOnDebt: d["Details"]["Interest on debt"],
        interestOnGeneralDebt: d["Details"]["Interest on general debt"],
        miscellaneousGeneralRevenue: d["Details"]["Miscellaneous general revenue"],
        otherTaxes: d["Details"]["Other taxes"],
        policeProtection: d["Details"]["Police protection"],
      },
    };
  });
}