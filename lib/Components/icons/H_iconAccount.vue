<template>
  <H_iconBase v-bind="$props">
    <path
      fill="currentColor"
      d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
    />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
