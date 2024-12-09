<template>
  <div>
    <div class="m-6 p-2 flex items-center gap-8 border border-err border-solid">
      <H_input label="Input">
        <div class="ico-account" />
        <div class="ico-account" />
      </H_input>
      <H_datePicker label="Date" v-model="date" show-seconds></H_datePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_input from "../../../lib/Components/H_input.vue";
import H_datePicker from "../../../lib/Components/H_datePicker.vue";
import { ref } from "vue";
const date = ref(new Date());
</script>

<style></style>
