<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="M7.03 13.92h4V5l2.01-.03v8.95h3.99l-5 5Z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
