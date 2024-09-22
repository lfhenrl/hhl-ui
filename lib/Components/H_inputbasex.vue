<template>
  <label class="H_inputbasex flex flex-col overflow-visible relative">
    <span v-if="!narrow" class="H_inputbase-label text-[.9em] text-txt2 ml-1 leading-snug">{{ label }}</span>
    <div
      class="flex items-center text-txt1 border border-txt5 border-solid rounded px-1.5 min-h-[1.875em] max-h-[1.875em] focus-within:border-pri"
    >
      <slot />
      <div @click="$emit('clear')" class="ico-close iconBtn" />
    </div>
    <div v-if="!narrow" class="H_inputbase-info text-[.7em] text-txt2 leading-snug ml-1 mr-1 flex justify-between">
      <template v-if="ErrorMessage == ''">
        <div>{{ HelpTextStart }}</div>
        <div>{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="H_inputbase-err">{{ ErrorMessage }}</div>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, default: "label" },
  HelpTextStart: { type: String, default: "HelpTextStart" },
  HelpTextEnd: { type: String, default: "HelpTextEnd" },
  ErrorMessage: { type: String, default: "" },
  narrow: { type: Boolean, default: false },
});
</script>
