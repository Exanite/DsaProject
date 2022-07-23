<template>
<div class="">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div v-if="showMobile" class="relative z-40 md:hidden" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
    <div  class="fixed inset-0 flex z-40">
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button @click="showMobile = false" type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Close sidebar</span>
            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4 text-3xl text-white font-bold">
          Project 3
        </div>
          <nav class="mt-5 px-2 space-y-1">
            <div class="text-white pr-2 pl-4 pt-8 pb-4 border rounded-md mb-2 text-md font-medium">
            <p>Selected method: <span class="block font-semibold pb-4">{{ selectedStrategy.name }}</span></p>
            <p class="mb-4">Sorted By Column: <span class="font-semibold">{{ columnName }}</span></p>
            <p>Sort Calculation Duration: <span class="block font-semibold pb-4">{{ (Math.round(sortDuration * 1000) / 1000).toFixed(3) }} Milliseconds</span></p>
          </div>

          <div class="mb-4">
            <div class="p-2 border rounded-md mb-2">
              <label for="dataSelectionAmount" class="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path :d="icons.downArrow" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Load a Custom Dataset
              </label>
              <select id="dataSelectionAmount" v-model="dataSelectionAmount" @change="generateData(dataSelectionAmount)" class="cursor-pointer max-w-lg mt-2 p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md" name="dataSelectionAmount">
                  <option :value="0" disabled hidden selected>Select a Custom Dataset</option>
                  <option value="10">10</option>
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="100000">100000</option>
                </select>
              </div>

              <div class="border rounded-md mb-2">
                <a @click="loadOriginalData()" href="#" class="hover:bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path :d="icons.rightArrow" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Or Load Original Dataset
                </a>
              </div>
            </div>

          <div class="p-2 border rounded-md">
            <label for="dataSelectionAmount" class="text-white group flex items-center pt-2 pb-4 text-sm font-medium rounded-md">
              <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path :d="icons.downArrow" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Select your sorting method:
            </label>
            <select id="sortMethod" v-model="selectedStrategyOption" class="cursor-pointer max-w-lg p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md" name="sortMethod">
            <option :value="undefined" disabled hidden selected>Select a Sort Method</option>
            <option v-for="strategy in sortingStrategies" :value="strategy">{{ strategy.name }}</option>
            </select>
          </div>
          </nav>
        </div>
      </div>
      <div class="flex-shrink-0 w-14"></div>
    </div>
  </div>

  <!-- Desktop Nav -->
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4 text-3xl text-white font-bold">
          Project 3
        </div>
        <nav class="flex-1 px-2 space-y-1 pt-8">        
          <div class="text-white pr-2 pl-4 pt-8 pb-4 border rounded-md mb-2 text-md font-medium">
            <p>Selected method: <span class="block font-semibold pb-4">{{ selectedStrategy.name }}</span></p>
            <p class="mb-4">Sorted By Column: <span class="font-semibold">{{ columnName }}</span></p>
            <p>Sort Calculation Duration: <span class="block font-semibold pb-4">{{ (Math.round(sortDuration * 1000) / 1000).toFixed(3) }} Milliseconds</span></p>
          </div>

          <div class="mb-4">
            <div class="p-2 border rounded-md mb-2">
              <label for="dataSelectionAmount" class="text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path :d="icons.downArrow" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Load a Custom Dataset
              </label>
              <select id="dataSelectionAmount" v-model="dataSelectionAmount" @change="generateData(dataSelectionAmount)" class="cursor-pointer max-w-lg mt-2 p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md" name="dataSelectionAmount">
                  <option :value="0" disabled hidden selected>Select a Custom Dataset</option>
                  <option value="10">10</option>
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="100000">100000</option>
                </select>
              </div>

              <div class="border rounded-md mb-2">
                <a @click="loadOriginalData()" href="#" class="hover:bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path :d="icons.rightArrow" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Or Load Original Dataset
                </a>
              </div>
            </div>

          <div class="p-2 border rounded-md">
            <label for="dataSelectionAmount" class="text-white group flex items-center pt-2 pb-4 text-sm font-medium rounded-md">
              <svg aria-hidden="true" class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path :d="icons.downArrow" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Select your sorting method:
            </label>
            <select id="sortMethod" v-model="selectedStrategyOption" class="cursor-pointer max-w-lg p-2 block bg-gray-50 border border-gray-200 w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md" name="sortMethod">
            <option :value="undefined" disabled hidden selected>Select a Sort Method</option>
            <option v-for="strategy in sortingStrategies" :value="strategy">{{ strategy.name }}</option>
            </select>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div class="md:pl-64 flex flex-col flex-1">
    <!-- Mobile Toggle -->
    <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
      <button @click="showMobile = true" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" type="button">
      <span class="sr-only">Open sidebar</span>
        <svg
        aria-hidden="true"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <!-- Main Container -->
    <div class="flex-1">
      <div class="py-6">       
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-center text-2xl font-semibold text-gray-900">Super duper, awesome title for this project. Go gators.</h1>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
          <p>When a new sorting method is selected, it will automatically sort by column ID.</p>
          <p class="mb-2">To sort by a different column, or to pick between ascending or descending order, select the column. </p>
          <FinanceDataTable :data="data" :sortingStrategy="selectedStrategy" @sorted="handleSorted"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
  import FinanceDataTable from "@/components/FinanceDataTable.vue";
  import { BubbleSortStrategy } from "@/data/algorithms/BubbleSortStrategy";
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { ArrayQuickSortStrategy, QuickSortFirstStrategy, QuickSortMedianOf3Strategy } from "@/data/algorithms/QuickSortStrategy";
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
      const sortDuration = ref(0);
      const columnName = ref("ID");
      const dataSelectionAmount = ref(0);
      const showMobile = ref(false);

      const icons = ref({
          downArrow: "M19 14l-7 7m0 0l-7-7m7 7V3",
          rightArrow: "M14 5l7 7m0 0l-7 7m7-7H3",
        }
      );

      const handleSorted = (sortingStrategyName: string, colName: string, resultLength: number, duration: number) => {
        sortDuration.value = duration;
        columnName.value = colName;
      };

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
        ArrayQuickSortStrategy,
      ]);

      const selectedStrategyOption = ref<SortingStrategy | undefined>(undefined);
      const selectedStrategy = computed<SortingStrategy>(() => {
        return selectedStrategyOption.value ?? BuiltInSortingStrategy;
      });

      return {
        data,
        handleSorted,
        loadOriginalData,
        generateData,
        icons,
        showMobile,
        sortDuration,
        columnName,
        dataSelectionAmount,
        sortingStrategies,
        selectedStrategyOption,
        selectedStrategy,
      };
    },
  });
</script>
