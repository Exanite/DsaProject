<template>
  <!-- <p>Index start: {{ indexStart }}</p>
  <p>Index end: {{ indexEnd }}</p>
  <p>Padding top: {{ paddingTop }}</p>
  <p>Padding bottom: {{ paddingBottom }}</p> -->
  <div
    :style="{'max-height': displayHeight + 'px'}"
    class="bg-gray-100 rounded-lg overflow-y-auto"
    v-on:scroll="onScroll"
  >
    <table class="w-full table-auto">
      <thead ref="headerElement" class="bg-gray-800 text-white sticky top-0">
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
        <tr :style="{height: paddingTop + 'px'}"/>
        <tr
          v-for="datam in data.slice(indexStart, indexEnd)"
          :key="datam.id"
          ref="rows"
          :class="indexStart % 2 === 0 ? 'even:bg-gray-200' : 'odd:bg-gray-200'"
        >
          <td v-for="column in columns" :key="column.name">{{ column.getValue(datam) }}</td>
        </tr>
        <tr :style="{height: paddingBottom  + 'px'}"/>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { isInOrder } from "@/data/algorithms/misc/IsInOrder";
  import { SortingStrategy } from "@/data/algorithms/SortingStrategy";
  import { Comparer } from "@/data/comparers/Comparer";
  import { FinanceDataEntry } from "@/data/FinanceData";
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
      sortingStrategy: {
        type: Object as () => SortingStrategy,
        required: true,
      },
    },
    emits: {
      sorted: (sortingStrategyName: string, columnName: string, elementCount: number, time: number) => true,
    },
    setup(props, context) {
      // Data
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
          return props.data;
        }

        const sortingStrategy = props.sortingStrategy;
        const comparer = new Comparer(column.getValue, sortedColumn.value.descending);

        const startTime = performance.now();
        const result = sortingStrategy.sort(props.data, comparer);
        const endTime = performance.now();

        console.log(`Sorted ${result.length} elements by ${column.name} in ${endTime - startTime} milliseconds using ${sortingStrategy.name}`);
        context.emit("sorted", sortingStrategy.name, column.name, result.length, endTime - startTime);

        // For testing purposes
        console.log(`Is correctly sorted: ${isInOrder(result, comparer)}`);

        return result;
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

      // Virtualized Scrolling
      const headerElement = ref<HTMLTableSectionElement>();
      const rowElements = ref<HTMLTableRowElement[]>();

      const rowHeight = computed(() => {
        const firstRow = rowElements.value?.at(0);

        if (!firstRow) {
          return 26;
        }

        return firstRow.clientHeight;
      });

      const fullRowsHeight = computed(() => {
        return rowHeight.value * sortedData.value.length;
      });

      const displayCount = ref(20);
      const displayHeight = computed(() => {
        const headerHeight = headerElement.value?.clientHeight ?? 0;

        return headerHeight + rowHeight.value * displayCount.value;
      });

      const scrollPosition = ref(0);

      const onScroll = (e: UIEvent) => {
        if (e.type != "scroll") {
          return;
        }

        const target = e.target as HTMLElement;
        scrollPosition.value = target.scrollTop;

        if (scrollPosition.value > fullRowsHeight.value) {
          scrollPosition.value = fullRowsHeight.value;
          target.scrollTop = fullRowsHeight.value;
        }
      };

      const indexStart = computed(() => {
        return Math.floor(scrollPosition.value / rowHeight.value);
      });

      const indexEnd = computed(() => {
        return indexStart.value + displayCount.value + 1;
      });

      const paddingTop = computed(() => {
        return indexStart.value * rowHeight.value;
      });

      const paddingBottom = computed(() => {
        return Math.max(fullRowsHeight.value - (rowHeight.value * displayCount.value - 1) - paddingTop.value, 0);
      });

      return {
        data: sortedData,
        columns: columns,
        sortedColumn: sortedColumn,
        onColumnSortClicked: onColumnSortClicked,

        headerElement: headerElement,
        rowElements: rowElements,

        displayHeight: displayHeight,
        indexEnd: indexEnd,
        indexStart: indexStart,

        paddingTop: paddingTop,
        paddingBottom: paddingBottom,

        onScroll: onScroll,
      };
    },
  });
</script>