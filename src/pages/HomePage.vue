<template>
  <div class="pb-4 flex flex-row space-x-2">
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="loadOriginalData()">Load original data</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(10)">Generate 10 entries</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(100)">Generate 100 entries</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(100000)">Generate 100,000 entries</button>
  </div>
  <FinanceDataTable :data="data"/>
</template>

<script lang="ts">
  import FinanceDataTable from "@/components/FinanceDataTable.vue";
  import HelloWorld from "@/components/HelloWorld.vue";
  import { DataGenerator } from "@/data/DataGenerator";
  import { getFinanceData } from "@/data/FinanceData";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "HomePage",
    components: {
      FinanceDataTable,
      HelloWorld,
    },
    setup() {
      const data = ref(getFinanceData());

      const loadOriginalData = () => {
        data.value = getFinanceData();
      }

      const generateData = (count: number) => {
        const generator = new DataGenerator();

        data.value = generator.generateCollection(count);
      };

      return {
        data: data,
        loadOriginalData: loadOriginalData,
        generateData: generateData,
      };
    },
  });
</script>
