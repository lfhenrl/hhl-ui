<template>
  <div>
    <div class="m-6 p-2 flex items-center gap-8 border border-err border-solid">
      <H_input label="Input">
        <div class="ico-account" />
        <div class="ico-account" />
      </H_input>
      <H_select label="Select" />
      <H_datePicker label="Date" v-model="date" show-seconds></H_datePicker>
      {{ mytime }}
      <input
        type="time"
        step="1"
        v-model="mytime"
        class="border border-txt5 rounded focus:outline-none px-1 py-0.5 focus:border-pri"
      />
      <H_timePicker label="Dato" v-model="mytime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import H_input from "../../../lib/Components/H_input.vue";
import H_datePicker from "../../../lib/Components/H_datePicker.vue";
import H_timePicker from "../../../lib/Components/H_timePicker.vue";
import { ref } from "vue";
const date = ref(new Date());
const mytime = ref();
</script>

<style></style>
