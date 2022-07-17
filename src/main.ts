import App from "@/App.vue";
import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
import { Comparer } from "@/data/comparers/Comparer";
import { DataGenerator } from "@/data/DataGenerator";
import router from "@/router";
import store from "@/store";
import "@/styles/globals.css";
import { createApp } from "vue";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

// Todo Remove
const generator = new DataGenerator();
const comparer = new Comparer(["year"], true);

const collection = generator.generateCollection(100);

const sorted = BuiltInSortingStrategy.sort(collection, comparer);

console.log(sorted);