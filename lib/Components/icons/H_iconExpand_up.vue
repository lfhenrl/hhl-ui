<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
