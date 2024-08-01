<template>
  <div class="_page">
    <div style="min-width: 400px; display: flex; gap: 20px">
      <H_pop :placement="placement" modal movable :inner="inner" :offset-left="offsetLeft" :offset-top="offsetTop">
        <template v-slot:referance>
          <H_btn>Open-modal</H_btn>
        </template>
        <div class="flexCol pop">
          <div class="flexRow" moveable-drag pop-close>TITLE xx</div>
        </div>
      </H_pop>
      <H_pop movable :placement="placement" :inner="inner" :offset-left="offsetLeft" :offset-top="offsetTop">
        <template v-slot:referance>
          <H_btn>Open</H_btn>
        </template>
        <div class="flexCol pop">
          <div moveable-drag>TITLE</div>
        </div>
      </H_pop>
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
      <H_inputNumber label="OffsetTop" v-model="offsetTop" />
      <H_inputNumber label="OffsetLeft" v-model="offsetLeft" />
      <H_icon icon="cast" />
    </div>
    <div style="min-height: 500px" />
  </div>
  <H_btn>test</H_btn>
  <div class="henrik">
    <label for="browser">Choose your browser from the list:</label>
    <input list="browsers" name="browser" id="browser" />
    <datalist id="browsers">
      <option value="Edge"></option>
      <option value="Firefox"></option>
      <option value="Chrome"></option>
      <option value="Opera"></option>
      <option value="Safari"></option>
    </datalist>
    <div class="custom-select" style="width: 200px">
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
        <option value="Edge">Edge</option>
        <option value="Firefox">Firefox</option>
        <option value="Chrome">Chrome</option>
        <option value="Opera">Opera</option>
        <option value="Safari">Safari</option>
      </select>
    </div>
    <input type="time" list="popularHours" step="2" />
    <input type="date" id="meeting-time" />
    <textarea />

    <button popovertarget="my-tooltip" style="anchor-name: --anchor-btn-1">
      <p>?</p>
    </button>

    <div id="my-tooltip" style="position-anchor: --anchor-btn-1" class="tooltip" popover>
      <p>
        I am a tooltip with more information. I am a tooltip with more information. I am a tooltip with more
        information. I am a tooltip with more information.
      </p>
      <p></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_pop from "../../../lib/Components/popup/H_pop.vue";
import H_select from "../../../lib/Components/select/H_select.vue";
import H_switch from "../../../lib/Components/H_switch.vue";
import H_icon from "../../../lib/Components/H_icon.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputNumber from "../../../lib/Components/H_inputNumber.vue";

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
