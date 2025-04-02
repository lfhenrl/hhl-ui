<template>
  <H_iconBase v-bind="$props">
    <path fill="currentColor" d="M7.03 9.97h4v8.92l2.01.03V9.97h3.99l-5-5Z" />
  </H_iconBase>
</template>
<script setup lang="ts">
import H_iconBase from "./base/H_iconBase.vue";
import { Props } from "./base/shProps";
defineProps(Props);
</script>
