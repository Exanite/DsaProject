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

console.log("Data is good");