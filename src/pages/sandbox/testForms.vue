<template>
  <div class="_page">
    <div style="display: flex" class="flex items-center bg-bg3 mt-8 px-4">
      <H_baseTimePicker class="ml-2" :time="time" @time-changed="(e:any) => (time = e)"></H_baseTimePicker>
      <H_date-picker label="Date"></H_date-picker>
      <H_baseDatePicker class="ml-2" :date="date" @date-changed="(e:any) => (date = e)"></H_baseDatePicker>
      <H_selectbox row :list="[`nr1`, `nr2`, `nr3`]" label="Selector"></H_selectbox>
    </div>
    <div style="min-height: 500px; color: contrast-color(var(--color-pri)); background-color: var(--color-pri)">
      HEJ
    </div>
  </div>
</template>

<script setup lang="ts">
import H_baseTimePicker from "../../../lib/SubComponents/date/H_baseTimePicker.vue";
import H_baseDatePicker from "../../../lib/SubComponents/date/H_baseDatePicker.vue";

import { ref } from "vue";

const time = ref({ hour: "11", minute: "11", second: "22" });
const date = ref({ date: 11, month: 11, year: 2022 });
</script>
<style scoped>
._page {
  display: flex;
}

.H_input_input {
  /*   border: solid 1px lime; */
  margin-inline: 0.2em;
  appearance: none;
  outline-style: none;
}

.xxx {
  order: 20;
}

.pop {
  border-radius: 4px;
  background-color: var(--color-bg1);
  padding: 100px;
}

.henrik {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.henrik input {
  border: 1px solid var(--color-bg5);
  margin-left: 5px;
  padding: 3px 5px;
  border-radius: 4px;
}
.henrik input:focus {
  outline: auto;
}

.select-items div,
.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}
textarea {
  border: 1px solid var(--color-bg5);
  margin-left: 5px;
  padding: 3px 5px;
  border-radius: 4px;
  field-sizing: content;
}

button {
  background: #ddd;
  font-size: 1rem;
  font-weight: 800;
  font-family: monospace;
  border-radius: 100%;
  aspect-ratio: 1/1;
  width: 1.5rem;
  line-height: 0;
  border: 2px solid black;
  margin-top: 40dvh;
}

#my-tooltip {
  inset-area: inline-end;
  position: absolute;

  /*  Position bottom of anchored elem at top of anchor  */

  /*  If no space on left, swap to the right  */
  position-try-options: flip-block;
}

.tooltip {
  font-family: system-ui, sans-serif;
  background: #333;
  color: white;
  font-weight: 400;
  padding: 1rem;
  max-width: 200px;
  line-height: 1.5;
}
</style>
