<template>
  <div class="border p-2">
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
    <div>
      <p>Scenario: {{ metadata.scenario.name }}</p>
      <p>Number of Elements: {{ metadata.elementCount }}</p>
      <p>Number of Trials: {{ metadata.trialCount }}</p>
    </div>
  </div>
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
      labels: {
        type: Array,
        default: () => {},
      },
      metadata: {
        type: Object,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      let chartData = {
        labels: props.labels,
        datasets: props.data,
      };

      const chartOptions = {
        // responsive: true 
      };

      return {
        chartData,
        chartOptions,
        metadata: props.metadata,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      };
    },
  });
</script>