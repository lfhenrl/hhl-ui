<template>
  <div class="testForms">
    <div style="min-height: 400px" />
    <H_row style="min-width: 400px">
      <div style="min-width: 400px" />
      <H_pop :placement="placement" modal :inner="inner" :offset-left="offsetLeft" :offset-top="offsetTop">
        <template v-slot:referance>
          <H_btn>Open-modal</H_btn>
        </template>
        <H_col class="popup col-bg-1">
          <H_row moveable-drag pop-close>TITLE</H_row>
        </H_col>
      </H_pop>
      <H_pop :placement="placement" :inner="inner" :offset-left="offsetLeft" :offset-top="offsetTop">
        <template v-slot:referance>
          <H_btn>Open</H_btn>
        </template>
        <H_col class="popup col-bg-1">
          <H_row moveable-drag pop-close>TITLE</H_row>
        </H_col>
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
          'center'
        ]"
      />
      <H_switch label="Inner" v-model="inner" />
      <H_inputNumber label="OffsetTop" v-model="offsetTop" />
      <H_inputNumber label="OffsetLeft" v-model="offsetLeft" />
    </H_row>
    <div style="min-height: 500px" />
  </div>
</template>

<script setup lang="ts">
import H_pop from "../../../lib/Components/popup/H_pop.vue";
import H_row from "../../../lib/Components/layout/H_row.vue";
import H_col from "../../../lib/Components/layout/H_col.vue";
import H_select from "../../../lib/Components/select/H_select.vue";
import H_switch from "../../../lib/Components/H_switch.vue";
import H_inputNumber from "../../../lib/Components/H_inputNumber.vue";
import { ref } from "vue";

const placement: any = ref("bottom");
const inner = ref(false);
const offsetTop = ref(0);
const offsetLeft = ref(0);
</script>

<style>
.testForms {
  margin: 10px;
  border: 1px solid red;
  width: 100%;
}

.popup {
  padding: 100px 100px;
  border-radius: 4px;
}

.popup .h_row {
  background-color: bisque;
}
</style>
