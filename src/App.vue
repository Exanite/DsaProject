<template>
  <div>
    <div>
      <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4 text-3xl text-white font-bold">
              <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> -->
              Home
            </div>
            <nav class="flex-1 px-2 space-y-1 pt-8">
              <a
                v-for="item in nav"
                :key="item.name"
                :href="item.href"
                class="hover:bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <svg
                  aria-hidden="true"
                  class="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="md:pl-64 flex flex-col flex-1">
        <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            type="button"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              aria-hidden="true"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Main -->
        <main class="flex-1">
          <div class="py-6">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "App",
    setup() {
      const navigation = ref([
        {
          name: "Home",
          href: "#",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          name: "Page 1",
          href: "#/about",
          icon: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
          name: "Page 2",
          href: "#/about",
          icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
        },
      ]);

      return {
        nav: navigation,
      };
    },
  });
</script>