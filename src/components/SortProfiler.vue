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
  import { ProfileScenario, profileSortStrategies } from "@/data/profiling/Profiling";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "SortProfiler",
    props: {
      sortStrategies: {
        type: Array as () => SortingStrategy[],
        required: true,
      },
    },
    setup(props) {
      const scenarios = ref<ProfileScenario[]>([
        {
          name: "Randomized data",
          key: "randomized",
          comparer: new Comparer(entry => entry.year),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        },
      ]);

      const selectedScenario = ref<ProfileScenario>(scenarios.value[0]);
      const selectedSortStrategies = ref<SortingStrategy[]>([...props.sortStrategies]);

      const run = () => {
        const result = profileSortStrategies(selectedScenario.value, selectedSortStrategies.value, 2500, 10);

        console.log(result);
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