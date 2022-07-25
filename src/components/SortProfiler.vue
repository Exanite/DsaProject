<template>
  <form class="flex flex-col" v-on:submit.prevent="run">
    <label>
      Select a scenario:
      <select v-model="selectedScenario">
        <option v-for="scenario in scenarios" :key="scenario.key" :value="scenario">{{ scenario.name }}</option>
      </select>
    </label>
    <label class="flex flex-col">
      Select sorts to run:
      <label v-for="strategy in sortStrategies" :for="strategy.key">
        {{ strategy.name }}
        <input :id="strategy.key" v-model="selectedSortStrategies" :value="strategy" type="checkbox">
      </label>
    </label>
    <input class="w-min cursor-pointer" type="submit" value="Run Performance Tests">
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

        run: run,
      };
    },
  });
</script>