<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="M9 11h6V8l4 4-4 4v-3H9v3l-4-4 4-4zm-7 9V4h2v16zm18 0V4h2v16z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
