<template>
  <H_iconBase v-bind="$props">
    <path
      fill="currentColor"
      d="m15 3 2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"
    />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
