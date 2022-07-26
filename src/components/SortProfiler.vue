<template>
  <form class="flex flex-col rounded border border-gray-800 p-2" v-on:submit.prevent="run">
    <div class="flex flex-row space-x-2">
      <div class="flex flex-col grow basis-1">
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Select a scenario</span>
          <select class="block border border-gray-600 rounded" v-model="selectedScenario">
            <option v-for="scenario in scenarios" :key="scenario.key" :value="scenario">{{ scenario.name }}</option>
          </select>
        </label>
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Number of elements in collection</span>
          <input class="block border border-gray-600 rounded" v-model="selectedElementCount" max="1000000" min="1" type="number">
        </label>
        <label class="flex flex-col justify-between pb-2">
          <span class="font-bold">Number of trials to run</span>
          <input class="block border border-gray-600 rounded" v-model="selectedTrialCount" max="100" min="1" type="number">
        </label>
      </div>
      <div class="flex flex-col grow basis-1">
        <label class="flex flex-col">
          <span class="font-bold">Select sorts to run</span>
          <label v-for="strategy in sortStrategies" :for="strategy.key" class="flex flex-row justify-between">
            <span>{{ strategy.name }}</span>
            <input :id="strategy.key" v-model="selectedSortStrategies" :value="strategy" type="checkbox">
          </label>
        </label>
      </div>
    </div>
    <input class="m-auto w-min cursor-pointer bg-gray-800 rounded text-white p-1 px-2 mt-4" type="submit" value="Run Performance Tests">
  </form>
</template>

<script lang="ts">
  import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
  import { Comparer } from "@/data/comparers/Comparer";
  import { DataGenerator } from "@/data/DataGenerator";
  import { ProfileResult, ProfileScenario, profileSortStrategies } from "@/data/profiling/Profiling";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "SortProfiler",
    props: {
      sortStrategies: {
        type: Array as () => SortingStrategy[],
        required: true,
      },
    },
    emits: {
      profileFinished: (results: ProfileResult[], scenario: ProfileScenario, elementCount: number, trialCount: number) => true,
    },
    setup(props, context) {
      const scenarios = ref<ProfileScenario[]>([
        {
          name: "Randomized data",
          key: "randomized",
          comparer: new Comparer(entry => entry.year),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
        {
          name: "Sorted data",
          key: "sorted",
          comparer: new Comparer(entry => entry.id),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
        {
          name: "Reverse sorted data",
          key: "reverse-sorted",
          comparer: new Comparer(entry => entry.id, true),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
      ]);

      const selectedScenario = ref<ProfileScenario>(scenarios.value[0]);
      const selectedSortStrategies = ref<SortingStrategy[]>([...props.sortStrategies]);
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

      return {
        sortStrategies: props.sortStrategies,
        scenarios: scenarios,

        selectedScenario: selectedScenario,
        selectedSortStrategies: selectedSortStrategies,
        selectedElementCount: selectedElementCount,
        selectedTrialCount: selectedTrialCount,

        run: run,
      };
    },
  });
</script>