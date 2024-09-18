<template>
  <H_datePicker label="Date" v-model="dato"></H_datePicker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_datePicker from "../../../lib/Components/H_datePicker.vue";

const dato = ref(new Date());
</script>
