<template>
  <Bar
    :chart-data="chartData"
    :chart-id="chartId"
    :chart-options="chartOptions"
    :css-classes="cssClasses"
    :height="height"
    :plugins="plugins"
    :styles="styles"
    :width="width"
  />
</template>

<script lang="ts">
  import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PluginOptionsByType, Title, Tooltip } from "chart.js";
  import { defineComponent, PropType } from "vue";
  import { Bar } from "vue-chartjs";

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export default defineComponent({
    name: "BarChart",
    components: { Bar },
    props: {
      chartId: {
        type: String,
        default: "bar-chart",
      },
      width: {
        type: Number,
        default: 300,
      },
      height: {
        type: Number,
        default: 150,
      },
      cssClasses: {
        default: "",
        type: String,
      },
      styles: {
        type: Object as PropType<Partial<CSSStyleDeclaration>>,
        default: () => {},
      },
      plugins: {
        type: Object as PropType<PluginOptionsByType<"bar">>,
        default: () => {},
      },
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      let chartData = {
        datasets: props.data,
      };

      const chartOptions = {
        // responsive: true 
      };

      return {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      };
    }
  })
</script>