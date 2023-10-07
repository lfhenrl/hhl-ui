<template>
  <div class="flex bg-bg0 p-8">
    <div class="flex gap-5" style="min-width: 400px">
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
        <div class="flex flex-col rounded bg-bg1 p-32">
          <div class="flex" moveable-drag pop-close>TITLE xx</div>
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
        <div class="flex flex-col rounded bg-bg1 p-32">
          <div moveable-drag pop-close>TITLE</div>
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
    </div>
    <div style="min-height: 500px" />
  </div>
</template>

<script setup lang="ts">
import H_pop from "../../../lib/Components/popup/H_pop.vue";
import H_select from "../../../lib/Components/select/H_select.vue";
import H_switch from "../../../lib/Components/H_switch.vue";
import H_btn from "../../../lib/Components/H_btn.vue";
import H_inputNumber from "../../../lib/Components/H_inputNumber.vue";
import { ref } from "vue";

const placement: any = ref("bottom");
const inner = ref(false);
const offsetTop = ref(0);
const offsetLeft = ref(0);
</script>
