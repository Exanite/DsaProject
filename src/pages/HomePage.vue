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
      <button class="bg-gray-800 rounded-md text-white font-bold py-1 px-2" v-on:click="generateData(100000)">
        Generate 100,000 entries
      </button>
    </div>
    <label class="block text-sm font-medium text-gray-700 sm:py-2" for="sortMethod"> Sort Method </label>
    <div class="mt-1 mb-4 sm:mt-0 sm:col-span-2">
      <select
        id="sortMethod"
        v-model="sortMethod"
        class="max-w-lg p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md"
        name="sortMethod"
        @change="sortData(sortMethod)"
      >
        <option :value="sortingStrategies[0]" disabled hidden selected>Select a Sort Method</option>
        <option v-for="strategy in sortingStrategies" :value="strategy">{{ strategy.name }}</option>
      </select>
    </div>
    <FinanceDataTable :data="data" :sortMethod="sortMethod"/>
  </div>
</template>

<script lang="ts">
  import FinanceDataTable from "@/components/FinanceDataTable.vue";
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
  import { DataGenerator } from "@/data/DataGenerator";
  import { getFinanceData } from "@/data/FinanceData";
  import { defineComponent, ref } from "vue";

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

      const sortData = (method: SortingStrategy) => {
        console.log("Sort method changed to " + method.name);
      };

      const sortingStrategies = ref<SortingStrategy[]>([
        BuiltInSortingStrategy,
        BuiltInSortingStrategy, // Swap these out to add new sorts
        BuiltInSortingStrategy,
      ]);

      const sortMethod = ref<SortingStrategy>(BuiltInSortingStrategy);

      return {
        data: data,
        loadOriginalData,
        generateData,
        sortData,
        sortingStrategies,
        sortMethod,
      };
    },
  });
</script>
