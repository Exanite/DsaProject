<template>
  {{ indexStart }}
  {{ indexEnd }}
  <div
    :style="{'max-height': displayHeight + 'px'}"
    class="bg-gray-100 rounded-lg overflow-y-auto"
    v-on:scroll="onScroll"
  >
    <table class="w-full table-auto">
      <thead class="bg-gray-800 text-white sticky top-0" ref="headerElement">
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
        <tr v-for="datam in data" :key="datam.id" ref="rows" class="even:bg-gray-200">
          <td v-for="column in columns" :key="column.name">{{ column.getValue(datam) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { BuiltInSortingStrategy } from "@/data/algorithms/BuiltInSortingStrategy";
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
    },
    setup(props) {
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

        const sortingStrategy = BuiltInSortingStrategy;
        const comparer = new Comparer(column.getValue, sortedColumn.value.descending);

        return sortingStrategy.sort(props.data, comparer);
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

      const elementHeight = computed(() => {
        const firstRow = rowElements.value?.at(0);

        if (!firstRow) {
          return 26;
        }

        return firstRow.clientHeight;
      });

      const fullHeight = computed(() => {
        return elementHeight.value * sortedData.value.length;
      });

      const displayCount = ref(20);
      const displayHeight = computed(() => {
        const headerHeight = headerElement.value?.clientHeight ?? 0;
        
        return headerHeight + elementHeight.value * displayCount.value;
      });

      const paddingTop = ref(0);
      const paddingBottom = ref(0);

      const scrollPosition = ref(0);

      const onScroll = (e: UIEvent) => {
        if (e.type != "scroll") {
          return;
        }

        const target = e.target as HTMLElement;
        scrollPosition.value = target.scrollTop;
      };

      const indexStart = computed(() => {
        return Math.floor(scrollPosition.value / elementHeight.value);
      });

      const indexEnd = computed(() => {
        return indexStart.value + displayCount.value;
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

        onScroll: onScroll,
      };
    },
  });
</script>