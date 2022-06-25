<template>
  <div class="about">
    <Dashboard></Dashboard>
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
