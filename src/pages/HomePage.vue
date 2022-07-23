<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-center text-2xl font-semibold text-gray-900">Dashboard</h1>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="pt-8 pb-4 flex flex-row space-x-2">
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="loadOriginalData()">
        Load original data
      </button>
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(10)">
        Generate 10 entries
      </button>
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(100)">
        Generate 100 entries
      </button>
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(1000)">
        Generate 1,000 entries
      </button>
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(10000)">
        Generate 10,000 entries
      </button>
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(100000)">
        Generate 100,000 entries
      </button>
    </div>
    <label class="block text-sm font-medium text-gray-700 sm:py-2" for="sortMethod"> Sort Method </label>
    <div class="mt-1 mb-4 sm:mt-0 sm:col-span-2">
      <select
        id="sortMethod"
        v-model="selectedStrategyOption"
        class="max-w-lg p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md"
        name="sortMethod"
      >
        <option :value="undefined" disabled hidden selected>Select a Sort Method</option>
        <option v-for="strategy in sortingStrategies" :value="strategy">{{ strategy.name }}</option>
      </select>
    </div>
    <p>Selected method: {{ selectedStrategy.name }}</p>
    <FinanceDataTable :data="data" :sortingStrategy="selectedStrategy"/>
  </div>
</template>

<script lang="ts">
  import FinanceDataTable from "@/components/FinanceDataTable.vue";
  import { BubbleSortStrategy } from "@/data/algorithms/BubbleSortStrategy";
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { QuickSortFirstStrategy, QuickSortMedianOf3Strategy } from "@/data/algorithms/QuickSortStrategy";
  import { SelectionSortStrategy } from "@/data/algorithms/SelectionSortStrategy";
  import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
  import { DataGenerator } from "@/data/DataGenerator";
  import { getFinanceData } from "@/data/FinanceData";
  import { computed, defineComponent, ref } from "vue";

  export default defineComponent({
    name: "HomePage",
    components: {
      FinanceDataTable,
    },
    setup() {
      const data = ref(getFinanceData());

      const loadOriginalData = () => {
        data.value = getFinanceData();
      };

      const generateData = (count: number) => {
        const generator = new DataGenerator();

        data.value = generator.generateCollection(count);
      };

      const sortingStrategies = ref<SortingStrategy[]>([
        // Swap these out to add new sorts
        BuiltInSortingStrategy,
        BubbleSortStrategy,
        SelectionSortStrategy,
        QuickSortFirstStrategy,
        QuickSortMedianOf3Strategy,
      ]);

      const selectedStrategyOption = ref<SortingStrategy | undefined>(undefined);
      const selectedStrategy = computed<SortingStrategy>(() => {
        return selectedStrategyOption.value ?? BuiltInSortingStrategy;
      });

      return {
        data: data,
        loadOriginalData,
        generateData,
        sortingStrategies,
        selectedStrategyOption: selectedStrategyOption,
        selectedStrategy: selectedStrategy,
      };
    },
  });
</script>
