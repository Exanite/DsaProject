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
  import { FinanceDataEntry } from "@/data/FinanceData";
  import { getValueByPath } from "@/data/Utility";
  import { defineComponent, ref } from "vue";

  interface Column {
    name: string,
    path: string[],
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

      return {
        columns: columns,
        data: props.data,
        getValueByPath: getValueByPath,
      };
    },
  });
</script>