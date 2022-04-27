<template>
  <div class="testForms">
    <H_form :data="data" @valid="isValid = $event" v-model:dirty="isDirty" @dirty-valid="isDirtyAndValid = $event">
      <H_input label="Navn" v-model="data.navn" :validator="[validator.required]" />
      <H_input label="City" v-model="data.city" :validator="[validator.required]" />
      <H_checkbox label="Valid" v-model="isValid" />
      <H_checkbox label="Dirty" v-model="isDirty" />
      <H_checkbox label="DirtyAndValid" v-model="isDirtyAndValid" />
      <H_slider v-model="data.duration" min="0" max="100" />
      <H_grid col="auto auto auto" row="auto" grid_al_content="end" grid_al_items="center">
        <div class="xBox">11111</div>
        <div class="xBox">11111111111111111111111111111</div>
        <div class="xBox">11111111111</div>
        <div class="xBox">11111111111111111111111111111111111</div>
        <div class="xBox">111111</div>
      </H_grid>
      <H_pop>
        <template v-slot:referance>
          <H_btn>default</H_btn>
        </template>
        <div class="col-bg-warn p-5 w-100pr">Hello</div>
      </H_pop>
      <button type="submit">SAVE</button>
    </H_form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { validator } from "../../../lib/utils/validator";

const isValid = ref(true);
const isDirty = ref(false);
const isDirtyAndValid = ref(false);


const data = reactive({
  navn: "",
  city: "",
  duration: 10
});
</script>

<style>
.testForms {
  display: grid;
  margin: 20px 30px;
}
.H_form {
  border: 1px solid lime;
  padding: 30px;
}

.xGrid {
  overflow: hidden;
  border: 1px solid red;
  flex-wrap: wrap;
}

.xBox {
  padding: 10px;
  background-color: aqua;
  min-width: 100px;
}
</style>
