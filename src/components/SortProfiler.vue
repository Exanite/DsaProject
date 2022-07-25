<template>
  <button v-on:click="run">Run Performance Tests</button>
</template>

<script lang="ts">
  import { ArrayQuickSortStrategy } from "@/data/algorithms/ArrayQuickSortStrategy";
  import { BubbleSortStrategy } from "@/data/algorithms/BubbleSortStrategy";
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { QuickSortFirstStrategy, QuickSortMedianOf3Strategy } from "@/data/algorithms/QuickSortStrategy";
  import { SelectionSortStrategy } from "@/data/algorithms/SelectionSortStrategy";
  import { Comparer } from "@/data/comparers/Comparer";
  import { DataGenerator } from "@/data/DataGenerator";
  import { ProfileScenario, profileSortStrategies } from "@/data/profiling/Profiling";

  export default {
    name: "SortProfiler",
    setup() {
      const run = () => {
        const scenario: ProfileScenario = {
          name: "Randomized data",
          key: "randomized",
          comparer: new Comparer(entry => entry.year),
          generateData: elementCount => new DataGenerator().generateCollection(elementCount),
        }
        
        const result = profileSortStrategies(scenario, [
          BuiltInSortingStrategy,
          BubbleSortStrategy,
          SelectionSortStrategy,
          QuickSortFirstStrategy,
          QuickSortMedianOf3Strategy,
          ArrayQuickSortStrategy,
        ], 2500, 10);

        console.log(result);
      }
      
      return {
        run: run,
      }
    }
  };
</script>