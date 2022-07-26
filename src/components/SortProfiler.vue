<template>
  <form class="flex flex-col rounded border border-gray-800 py-4 px-6" v-on:submit.prevent="run">
    <div class="flex flex-row space-x-4">
      <div class="flex flex-col grow basis-1">
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Select a Test Scenario</span>
          <select class="block border border-gray-600 rounded" v-model="selectedScenario">
            <option v-for="scenario in scenarios" :key="scenario.key" :value="scenario">{{ scenario.name }}</option>
          </select>
        </label>
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Number of Elements to Test</span>
          <input class="block border border-gray-600 rounded" v-model="selectedElementCount" max="1000000" min="1" type="number">
        </label>
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Number of Trials</span>
          <input class="block border border-gray-600 rounded" v-model="selectedTrialCount" max="100" min="1" type="number">
        </label>
      </div>
      <div class="flex flex-col grow basis-1">
        <label class="flex flex-col">
          <span class="font-bold">Select Sorting Strategies to Test</span>
          <label v-for="strategy in sortStrategies" :key="strategy.key" :for="strategy.key" class="flex flex-row justify-between my-1">
            <span>{{ strategy.name }}</span>
            <input :id="strategy.key" v-model="selectedSortStrategies" :value="strategy" type="checkbox">
          </label>
        </label>
      </div>
    </div>
    <div class="flex justify-center gap-2">
      <button class="cursor-pointer bg-gray-700 hover:bg-gray-900 rounded text-white py-2 px-4 mt-4" type="submit">Run Performance Tests</button>
      <button @click="clearCharts" class="cursor-pointer bg-gray-700 hover:bg-gray-900 rounded text-white py-2 px-4 mt-4" type="button">Clear All Charts</button>
    </div>
  </form>
</template>

<script lang="ts">
  import { ProfileResult } from "@/data/interfaces/ProfileResult";
  import { ProfileScenario } from "@/data/interfaces/ProfileScenario";
  import { SortStrategy } from "@/data/interfaces/SortStrategy";
   import { Comparer } from "@/data/comparers/Comparer";
  import { DataGenerator } from "@/data/DataGenerator";
  import { profileSortStrategies } from "@/data/profiling/ProfileSortStrategies";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "SortProfiler",
    props: {
      sortStrategies: {
        type: Array as () => SortStrategy[],
        required: true,
      },
    },
    emits: {
      profileFinished: (results: ProfileResult[], scenario: ProfileScenario, elementCount: number, trialCount: number) => true,
      clearCharts: () => true
    },
    setup(props, context) {
      const scenarios = ref<ProfileScenario[]>([
        {
          name: "Randomized Data",
          key: "randomized",
          comparer: new Comparer(entry => entry.year),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
        {
          name: "Sorted Data",
          key: "sorted",
          comparer: new Comparer(entry => entry.id),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
        {
          name: "Reverse-Sorted Data",
          key: "reverse-sorted",
          comparer: new Comparer(entry => entry.id, true),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
      ]);

      const selectedScenario = ref<ProfileScenario>(scenarios.value[0]);
      const selectedSortStrategies = ref<SortStrategy[]>([...props.sortStrategies]);
      const selectedElementCount = ref<number>(1000);
      const selectedTrialCount = ref<number>(10);

      const run = () => {
        const results = profileSortStrategies(
          selectedScenario.value,
          selectedSortStrategies.value,
          selectedElementCount.value,
          selectedTrialCount.value);

        context.emit("profileFinished",
          results,
          selectedScenario.value,
          selectedElementCount.value,
          selectedTrialCount.value);

        console.log(results);
      };

      const clearCharts = () => {
          context.emit("clearCharts")
      }

      return {
        sortStrategies: props.sortStrategies,
        scenarios: scenarios,
        selectedScenario: selectedScenario,
        selectedSortStrategies: selectedSortStrategies,
        selectedElementCount: selectedElementCount,
        selectedTrialCount: selectedTrialCount,
        clearCharts,
        run
      };
    },
  });
</script>