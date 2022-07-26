import { State } from "@/data/State";

export interface FinanceDataEntry {
    id: number,
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