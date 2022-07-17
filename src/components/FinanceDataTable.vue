<template>
  <table>
    <tr>
      <th v-for="column in columns" :key="column.name">
        {{ column.name }}
      </th>
    </tr>
    <tr v-for="datam in data" :key="datam.id">
      <td v-for="column in columns" :key="column.name">{{ getValueByPath(datam, column.path) }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
  import { Comparer } from "@/data/comparers/Comparer";
  import { FinanceDataEntry } from "@/data/FinanceData";
  import { getValueByPath } from "@/data/Utility";
  import { computed, defineComponent, ref } from "vue";

  interface Column {
    name: string,
    path: string[],
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
          name: "Year",
          path: ["year"],
        },
        {
          name: "State",
          path: ["state"],
        },
        {
          name: "Expenditure",
          path: ["totals", "expenditure"],
        },
        {
          name: "Revenue",
          path: ["totals", "revenue"],
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
        const comparer = new Comparer(column.path, sortedColumn.value.descending);

        return sortingStrategy.sort(data.value, comparer);
      });

      return {
        columns: columns,
        data: sortedData,
        getValueByPath: getValueByPath,
      };
    },
  });
</script>