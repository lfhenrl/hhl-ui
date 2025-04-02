<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
