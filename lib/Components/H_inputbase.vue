<template>
  <label
    class="H_inputbase"
    :class="{ 'pointer-events-none': readonly }"
    :data-error="ErrorMessage != '' ? true : undefined"
  >
    <span
      class="text-[.9em] text-txt2 ml-1 min-h-[1.3em] max-h-[1.3em] leading-none absolute -top-[1.3em] z-10 whitespace-nowrap"
      >{{ label }}</span
    >
    <div
      class="H_inputbase-slot flex items-center text-txt1 border border-txt5 border-solid rounded min-h-[1.875em] focus-within:border-pri"
      :class="refClass"
    >
      <slot />
      <H_icon name="close" size="1.2rem" color="txt3" btn v-if="clearable" class="-ml-1.5" @click="$emit('clear')" />
    </div>
    <div class="text-[.9em] text-txt2 px-1 flex justify-between min-h-[1.3em] max-h-[1.3em] w-full absolute top-[2em]">
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
import H_icon from "./H_icon.vue";
defineProps({
  refClass: {},
  label: { type: String, default: "label" },
  clearable: { type: Boolean, default: false },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  ErrorMessage: { type: String, default: "" },
  readonly: { type: Boolean, default: false },
});
</script>
<style>
@layer components {
  .H_inputbase {
    display: flex;
    flex-direction: column;
    width: max-content;
    position: relative;
  }

  .H_inputbase .H_icon {
    font-size: 1.2em;
  }
  .H_inputbase-slot .H_icon:first-child {
    margin-right: 6px;
  }

  .H_inputbase-slot .H_icon:first-child[set-end] {
    margin-right: 0;
  }

  .H_inputbase-slot .H_icon:last-child {
    margin-right: 3px;
  }
  .H_inputbase[disabled] {
    pointer-events: none;
    opacity: 50%;
  }

  .H_inputbase [set-end] {
    grid-column-start: 3;
    grid-row-start: 1;
  }
}
</style>
