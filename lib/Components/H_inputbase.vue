<template>
  <label
    class="H_inputbase flex flex-col w-full [&[disabled]]:pointer-events-none [&[disabled]]:opacity-40"
    :data-error="ErrorMessage != '' ? true : undefined"
  >
    <span v-if="!narrow" class="text-[.9em] text-txt2 ml-1 min-h-[1.3em] max-h-[1.3em] leading-none">{{ label }}</span>
    <div
      class="H_inputbase-slot flex items-center text-txt1 border border-txt5 border-solid rounded px-1.5 min-h-[1.875em] focus-within:border-pri"
    >
      <slot />
      <div
        v-if="clearable"
        @click="$emit('clear')"
        class="ico-close iconBtn"
        :class="{ 'pointer-events-none': readonly }"
      />
    </div>
    <div v-if="!narrow" class="text-[.9em] text-txt2 ml-1 mr-1 flex justify-between min-h-[1.3em] max-h-[1.3em]">
      <template v-if="ErrorMessage == ''">
        <div class="text-[.75em]">{{ HelpTextStart }}</div>
        <div class="text-[.75em]">{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="text-err text-[.75em]">{{ ErrorMessage }}</div>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, default: "label" },
  clearable: { type: Boolean, default: false },
  HelpTextStart: { type: String, default: "HelpTextStart" },
  HelpTextEnd: { type: String, default: "HelpTextEnd" },
  ErrorMessage: { type: String, default: "sdfgdsg" },
  narrow: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});
</script>
<style>
@layer hhl-components {
  .H_inputbase [set-end] {
    grid-column-start: 3;
    grid-row-start: 1;
  }
}
</style>
