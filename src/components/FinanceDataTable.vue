<template>
  <table>
    <tr>
      <th>Year</th>
      <th>State</th>
      <th>Expenditure</th>
      <th>Revenue</th>
    </tr>
    <tr v-for="datam in data" :key="datam.id">
      <td>{{ datam.year }}</td>
      <td>{{ datam.state }}</td>
      <td>{{ datam.totals.expenditure }}</td>
      <td>{{ datam.totals.revenue }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
  import { FinanceDataEntry } from "@/data/FinanceData";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "FinanceDataTable",
    props: {
      data: {
        type: Array as () => FinanceDataEntry[],
        required: true,
      },
    },
    setup(props) {
      return {
        data: props.data,
      };
    },
  });
</script>