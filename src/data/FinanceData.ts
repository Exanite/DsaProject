import financeData from "@/assets/finance.json";

export interface FinanceDataEntry {

}

export const FinanceData: FinanceDataEntry[] = financeData;

//     "Details": {
//       "Correction": {
//         "Correction Total": 182698
//       },
//       "Education": {
//         "Education Total": 3570524
//       },
//       "Financial Aid": {
//         "Assistance and Subsidies": 273050,
//         "Cash and Securities Total": 14594322
//       },
//       "Health": {
//         "Health Total Expenditure": 394119
//       },
//       "Intergovernmental": {
//         "Intergovernmental Expenditure": 2143312,
//         "Intergovernmental to Combined and Unallocable": 518611
//       },
//       "Natural Resources": {
//         "Natural Resources Construction": 151432,
//         "Parks": {
//           "Parks Total Expenditure": 9728
//         }
//       },
//       "Utilities": {
//         "Utilities Current Operation": 5564374
//       },
//       "Welfare": {
//         "Welfare Institution Total Expenditure": 1853436
//       },
//       "Transportation": {
//         "Highways": {
//           "Highways Total Expenditure": 694874
//         }
//       },
//       "Insurance benefits and repayments": 724852,
//       "Interest on debt": 280179,
//       "Interest on general debt": 280179,
//       "Miscellaneous general revenue": 607453,
//       "Other taxes": 205227,
//       "Police protection": 77789

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