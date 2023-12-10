<template>
  <label
    class="H_inputbase"
    @click.prevent="Click"
    :disabled="disabled ? true : undefined"
    :data-error="ErrorMessage != '' ? true : undefined"
  >
    <div class="H_inputbase-label">
      {{ label }}
    </div>
    <div class="H_inputbase-starticon">
      <slot name="start" />
    </div>
    <div class="H_inputbase-endicon">
      <slot name="end" />
      <H_icon
        btn="standard"
        v-if="clearable"
        icon="close"
        class="H_inputbase-clearicon"
      />
    </div>

    <div class="H_inputbase-mainSlot">
      <slot />
    </div>

    <div class="H_inputbase-info">
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
import H_icon from "../Components/H_icon.vue";

defineProps({
  label: { type: String, default: "Label" },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  ErrorMessage: { type: String, default: "" },
});

const E = defineEmits(["ClearClick", "click"]);

function Click(e: MouseEvent) {
  const ele = e.target as any;
  if (!ele) return null;
  let cl = ele.classList;
  if (cl.length === 0) cl = ele.parentElement.classList;

  if (cl.contains("H_inputbase-clearicon")) E("ClearClick");
  else E("click");
}
</script>
<style>
@layer hhl-components {
  .H_inputbase {
    position: relative;
    display: grid;
    min-width: 100px;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    border: 1px solid var(--col-bg-4);
    border-radius: 4px;
    outline: none;
  }

  .H_inputbase:focus-within {
    border-color: var(--col-pri);
  }

  .H_inputbase[data-error] {
    border-color: var(--col-err);
  }

  .H_inputbase-mainSlot {
    display: flex;
    flex-direction: column;
    grid-column-start: 2;
    grid-row-start: 2;
    width: 100%;
    height: 100%;
    margin-top: -1px;
  }

  .H_inputbase-label {
    pointer-events: none;
    position: absolute;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column: span 4 / span 4;
    margin-top: -22px;
    user-select: none;
    font-size: 14px;
    color: var(--col-txt-2);
  }

  .H_inputbase:focus-within .H_inputbase-label {
    color: var(--col-pri);
  }

  .H_inputbase[data-error] .H_inputbase-label {
    color: var(--col-err);
  }

  .H_inputbase-starticon {
    display: flex;
    align-items: center;
    grid-column-start: 1;
    grid-row-start: 2;
    margin-left: 4px;
    color: var(--col-txt-3);
  }

  .H_inputbase-endicon {
    display: flex;
    align-items: center;
    grid-column-start: 3;
    grid-row-start: 2;
    margin-right: 4px;
    color: var(--col-txt-3);
  }

  .H_inputbase-clearicon {
    display: flex;
    align-items: center;
    margin-right: 4px;
    color: var(--col-txt-3);
  }

  .H_inputbase-info {
    display: flex;
    position: absolute;
    justify-content: space-between;
    grid-column-start: 1;
    grid-row-start: 3;
    grid-column: span 4 / span 4;
    max-height: 0;
    width: 100%;
    height: 0;
    user-select: none;
    overflow: visible;
    color: var(--col-txt-2);
    font-size: 12px;
    padding-left: 2px;
    padding-right: 2px;
    top: 6px;
  }

  .H_inputbase-err {
    color: var(--col-err);
  }
}
</style>
