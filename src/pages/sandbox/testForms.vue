<template>
  <div class="_page">
    <div style="display: flex; gap: 20px">
      <H_select
        label="Placement"
        v-model="placement"
        :list="[
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
          'center',
        ]"
      />
      <H_switch label="Inner" v-model="inner" />
      <H_input type="number" label="OffsetTop" v-model="offsetTop" />
      <H_input type="number" label="OffsetLeft" v-model="offsetLeft" />
    </div>
    <div style="min-height: 500px" />
  </div>
</template>

<script setup lang="ts">
import H_select from "../../../lib/Components/H_select.vue";
import H_switch from "../../../lib/Components/H_switch.vue";
import H_input from "../../../lib/Components/H_input.vue";

import { ref } from "vue";

const placement: any = ref("bottom");
const inner = ref(false);

const offsetTop = ref(0);
const offsetLeft = ref(0);
</script>
<style scoped>
._page {
  display: flex;
  padding: 32px;
  background-color: var(--col-bg-0);
  height: 900px;
}

.pop {
  border-radius: 4px;
  background-color: var(--col-bg-1);
  padding: 100px;
}

.henrik {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.henrik input {
  border: 1px solid var(--col-bg-5);
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
  border: 1px solid var(--col-bg-5);
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
