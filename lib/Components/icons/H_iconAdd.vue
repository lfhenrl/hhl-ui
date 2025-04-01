<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="m9 20.42-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "../../SubComponents/H_iconBase.vue";
import { Props } from "../../SubComponents/shProps";
defineProps(Props);
</script>
