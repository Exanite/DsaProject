<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PluginOptionsByType } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Object as PropType<PluginOptionsByType<'bar'>>,
      default: () => {}
    }
  },
  setup(props) {
    const chartData = {
      labels: [ 'Sort' ],
      datasets: [
        { 
        label: "Set 1",
        backgroundColor: '#8888cc',
        data: [40]
        },
        { 
        label: "Set 2", 
        backgroundColor: '#88cc88',
        data: [20]
        },
        { 
        label: "Set 3", 
        backgroundColor: '#cc8888',
        data: [31]
        } 
      ]
    }

    const chartOptions = { 
      // responsive: true 
      }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
</script>