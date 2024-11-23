<template>
  <div>
    <div class="m-6 p-2 flex gap-8 border border-err border-solid">
      <H_input label="Input">
        <div class="ico-account" />
        <div class="ico-account" />
      </H_input>
      <H_datePicker label="Date"></H_datePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_input from "../../../lib/Components/H_input.vue";
import H_datePicker from "../../../lib/Components/H_datePicker.vue";
</script>

<style></style>
