<template>
  <div class="_page">
    <div style="display: flex" class="flex items-center bg-bg3 mt-8 px-4">
      <input size="1" class="border-pri border" />
      <H_switch label="Inner" v-model="inner" />
      <H_input type="number" label="OffsetLeft" v-model="offsetLeft" hint-start="START" hint-end="END" />
      <H_input v-model="inputValue">
        <H_icon name="clock" size="1.2rem" color="txt3" btn set-end />
        <H_icon name="clock" size="1.2rem" color="txt3" btn class="" />
      </H_input>
      <H_date-picker label="Date"></H_date-picker>
      <H_selectbox row :list="[`nr1`, `nr2`, `nr3`]" label="Selector"></H_selectbox>
    </div>
    <div style="min-height: 500px" />
  </div>
</template>

<script setup lang="ts">
import H_switch from "../../../lib/Components/H_switch.vue";
import H_input from "../../../lib/Components/H_input.vue";

import { ref } from "vue";

const inputValue = ref("henrik");

const inner = ref(false);

const offsetLeft = ref(0);
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
