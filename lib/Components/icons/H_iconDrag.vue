<template>
  <H_iconBase v-bind="$props">
    <path
      fill="currentColor"
      d="M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"
    />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
