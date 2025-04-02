<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
