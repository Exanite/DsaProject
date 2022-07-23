<template>
  <div>
    <main class="flex-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "App",
      });
</script>