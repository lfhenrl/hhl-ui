<template>
  <div>
    <div class="m-6 p-2 flex flex-col gap-4 border border-err border-solid">
      <H_inputbasex label="Extra small" class="text-xs">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
      <H_inputbasex label="Small" class="text-sm">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
      <H_inputbasex label="Default (base)" class="text-base">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
      <H_inputbasex label="Large" class="text-lg">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
      <H_inputbasex label="Extra large" class="text-xl">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
      <H_inputbasex label="3 x Extra large" class="text-3xl">
        <input type="string" class="w-full bg-transparent border-none appearance-none focus:outline-none" />
        <div class="ico-account justify-self-end" />
      </H_inputbasex>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_inputbasex from "../../../lib/Components/H_inputbasex.vue";
</script>

<style></style>
