<template>
  <div class="_page">
    <div style="min-width: 400px; display: flex; gap: 20px">
      <H_pop
        :placement="placement"
        modal
        movable
        :inner="inner"
        :offset-left="offsetLeft"
        :offset-top="offsetTop"
      >
        <template v-slot:referance>
          <H_btn>Open-modal</H_btn>
        </template>
        <div class="flexCol pop">
          <div class="flexRow" moveable-drag pop-close>TITLE xx</div>
        </div>
      </H_pop>
      <H_pop
        movable
        :placement="placement"
        :inner="inner"
        :offset-left="offsetLeft"
        :offset-top="offsetTop"
      >
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
}

.pop {
  border-radius: 4px;
  background-color: var(--col-bg-1);
  padding: 100px;
}
</style>
