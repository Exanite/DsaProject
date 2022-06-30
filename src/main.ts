import App from "@/App.vue";
import { FinanceData } from "@/data/FinanceData";
import { ValidStates } from "@/data/State";
import router from "@/router";
import store from "@/store";
import "@/styles/globals.css";
import { createApp } from "vue";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

for (const financeDatum of FinanceData) {
  if (!ValidStates.includes(financeDatum.state)) {
    throw new Error(financeDatum.state);
  }
}

console.log("Validated finance data");

// Todo Remove
// const generator = new DataGenerator();
// const comparer = new Comparer(["totals", "capitalOutlay"]);
//
// const a = generator.generate();
// const b = generator.generate();
//
// console.log(a);
// console.log(b);
//
// console.log(comparer.compare(a, b));