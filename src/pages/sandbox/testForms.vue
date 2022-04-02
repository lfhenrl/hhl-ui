<template>
  <div class="testForms">
    <H_form :data="data" @valid="isValid = $event" v-model:dirty="isDirty" @dirty-valid="isDirtyAndValid = $event">
      <H_input label="Navn" v-model="data.navn" :validator="[validator.required]" />
      <H_input label="City" v-model="data.city" :validator="[validator.required]" />
      <H_checkbox label="Valid" v-model="isValid" />
      <H_checkbox label="Dirty" v-model="isDirty" />
      <H_checkbox label="DirtyAndValid" v-model="isDirtyAndValid" />
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
  city: ""
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
</style>
