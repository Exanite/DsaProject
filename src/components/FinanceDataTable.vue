<template>
  <div class="pb-4 flex flex-row space-x-2">
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="loadOriginalData()">Load original data</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(10)">Generate 10 entries</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(100)">Generate 100 entries</button>
    <button class="bg-gray-800 rounded-md text-white font-bold p-1" v-on:click="generateData(1000)">Generate 1000 entries</button>
  </div>
  <div class="bg-gray-100 rounded-lg max-h-[600px] overflow-y-auto">
    <table class="w-full table-auto">
      <thead class="bg-gray-800 text-white sticky top-0">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.name"
            class="cursor-pointer"
            v-on:click="onColumnSortClicked(index)"
          >
            <div class="flex flex-row justify-center">
              <div class="w-[1em]"/>
              <div>{{ column.name }}</div>
              <div :class="[{ 'rotate-180': sortedColumn.descending }, 'w-[1em]']">
                <div v-if="sortedColumn.index === index">^</div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="datam in data" :key="datam.id" class="even:bg-gray-200">
          <td v-for="column in columns" :key="column.name">{{ column.getValue(datam) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { Comparer } from "@/data/comparers/Comparer";
  import { DataGenerator } from "@/data/DataGenerator";
  import { FinanceDataEntry, getFinanceData } from "@/data/FinanceData";
  import { computed, defineComponent, ref } from "vue";

  interface Column {
    name: string,
    getValue: (entry: FinanceDataEntry) => any,
  }

  interface SortedColumn {
    index: number,
    descending: boolean,
  }

  export default defineComponent({
    name: "FinanceDataTable",
    props: {
      data: {
        type: Array as () => FinanceDataEntry[],
        required: true,
      },
    },
    setup(props) {
      const data = ref(props.data);

      const columns = ref<Column[]>([
        {
          name: "ID",
          getValue: entry => entry.id,
        },
        {
          name: "Year",
          getValue: entry => entry.year,
        },
        {
          name: "State",
          getValue: entry => entry.state,
        },
        {
          name: "Expenditure",
          getValue: entry => entry.totals.expenditure,
        },
        {
          name: "Revenue",
          getValue: entry => entry.totals.revenue,
        },
      ]);

      const sortedColumn = ref<SortedColumn>({
        index: 0,
        descending: false,
      });

      const sortedData = computed<FinanceDataEntry[]>(() => {
        const column = columns.value.at(sortedColumn.value.index);

        if (!column) {
          return data.value;
        }

        const sortingStrategy = BuiltInSortingStrategy;
        const comparer = new Comparer(column.getValue, sortedColumn.value.descending);

        return sortingStrategy.sort(data.value, comparer);
      });

      const onColumnSortClicked = (index: number) => {
        if (sortedColumn.value.index == index) {
          sortedColumn.value.descending = !sortedColumn.value.descending;
        } else {
          sortedColumn.value = {
            index: index,
            descending: false,
          };
        }
      };
      
      const loadOriginalData = () => {
        data.value = getFinanceData();
      }

      const generateData = (count: number) => {
        const generator = new DataGenerator();

        data.value = generator.generateCollection(count);
      };

      return {
        columns: columns,
        sortedColumn: sortedColumn,
        data: sortedData,
        loadOriginalData: loadOriginalData,
        generateData: generateData,
        onColumnSortClicked: onColumnSortClicked,
      };
    },
  });
</script>