<template>
  <div class="about">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-center text-2xl font-semibold text-gray-900">About Page</h1>
    </div>
  </div>
</template>

<script lang="ts">
  import Dashboard from "@/components/Dashboard.vue";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AboutPage",
    components: {
      Dashboard,
    },
  });
</script>
