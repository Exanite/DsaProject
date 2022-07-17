<template>
  <p>
    {{ JSON.stringify(data)}}
  </p>
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
      }
    },
    setup(props) {
      return {
        data: props.data,
      }
    }
  });
</script>