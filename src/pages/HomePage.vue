<template>
  <FinanceDataTable :data="financeData"/>
</template>

<script lang="ts">
  import FinanceDataTable from "@/components/FinanceDataTable.vue";
  import HelloWorld from "@/components/HelloWorld.vue";
  import { getFinanceData } from "@/data/FinanceData";
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "HomePage",
    components: {
      FinanceDataTable,
      HelloWorld,
    },
    setup() {
      const financeData = ref(getFinanceData());

      return {
        financeData: financeData,
      };
    },
  });
</script>
