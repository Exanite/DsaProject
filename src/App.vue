<template>
  <div>
    <div>
      <!-- Mobile -->
      <div aria-modal="true" class="relative z-40 md:hidden" role="dialog">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>

        <div class="fixed inset-0 flex z-40">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                type="button"
              >
                <span class="sr-only">Close sidebar</span>
                <svg
                  aria-hidden="true"
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> -->
                Hello World
              </div>
              <nav class="mt-5 px-2 space-y-1">
                <a
                  v-for="item in nav"
                  :key="item.name"
                  :href="item.href"
                  class="bg-gray-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    aria-hidden="true"
                    class="text-gray-300 mr-4 flex-shrink-0 h-6 w-6"
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

          <div class="flex-shrink-0 w-14">
          </div>
        </div>
      </div>

      <!-- Desktop -->
      <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4 text-3xl text-white font-bold">
              <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> -->
              Home
            </div>
            <nav class="flex-1 px-2 space-y-1">
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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <router-view/>
              <div class="py-4">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "App",
  });
</script>