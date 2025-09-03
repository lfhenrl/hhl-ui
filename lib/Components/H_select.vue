<template>
  <H_popover
    class="H_select"
    ref="popup"
    @toggled="selectToggled"
    offset-top="6px"
    :disabled
    :readonly
    :autofocus
    role="combobox"
    aria-haspopup="listbox"
    :aria-label="label"
    width-as-ref
  >
    <template v-slot:referance>
      <H_inputbase class="H_select_input" :label readonly :disabled :placeholder :hintStart :hintEnd :validator>
        <slot />
        <div class="H_select_input_value">
          {{ labelValue }}
        </div>
        <H_icon
          btn
          name="expand_down"
          class="H_select_input_icon"
          :class="{ isopen: isOpen }"
          tabindex="-1"
          :down="isOpen ? '' : undefined"
        />
      </H_inputbase>
    </template>
    <div class="H_select__list" @keydown="keyDown">
      <H_input v-if="showFilter" ref="filterInput" narrow v-model="filterValue" clearable tabindex="-1">
        <H_icon class="H_select__list_search_icon" name="search" set-end tabindex="-1" />
      </H_input>
      <H_selectbase
        ref="selBase"
        class="H_select__list_selectbase"
        v-model="modelValue"
        :list
        :multi
        :variant
        :justifyBetween
        :list-gap
        :label-gap
        :label-left
        v-model:label="labelValue"
        :filter="filterValue"
        tabindex="-1"
      />
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watch, type PropType } from "vue";
import H_selectbase from "./H_selectbase.vue";
import H_popover from "./H_popover.vue";
import H_inputbase from "./H_inputbase.vue";
import H_input from "./H_input.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  label: { type: String, default: "" },
  list: { type: Array, default: [] },
  multi: { type: Boolean, default: false },
  labelLeft: { type: Boolean, default: false },
  justifyBetween: { type: Boolean, default: false },
  labelGap: { type: String, default: "6px" },
  listGap: { type: String, default: "3px" },
  placeholder: { type: String, default: "" },
  showFilter: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  validator: { type: Array, default: [] },
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "checkbox",
  },
});

const modelValue: any = defineModel();
const popup = useTemplateRef("popup");
const selBase = useTemplateRef<typeof H_selectbase>("selBase");
const filterInput = useTemplateRef("filterInput");
const labelValue = ref("");
const isOpen = ref(false);
const filterValue = ref("");

watch(modelValue, () => {
  if (P.multi === false) {
    popup.value?.close();
  }
});

function selectToggled(e: any) {
  if (e) {
    isOpen.value = true;
    ArrowDown();
  } else {
    isOpen.value = false;
  }
}

function keyDown(e: KeyboardEvent) {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") ArrowDown();
  else if (e.key === "ArrowUp" || e.key === "ArrowLeft") ArrowUp();
  else FilterInput(e.key, e.code);
}

function ArrowDown() {
  const { ok, focusIndex, list } = getFocusList();
  if (ok === false) return;
  if (focusIndex < 0) list[0]?.focus();
  if (focusIndex >= 0 && focusIndex < list.length - 1) {
    list[focusIndex + 1].focus();
  }
}

function ArrowUp() {
  const { ok, focusIndex, list } = getFocusList();
  if (ok === false) return;
  if (focusIndex > 0 && focusIndex < list.length) {
    list[focusIndex - 1].focus();
  }
}

function FilterInput(key: string, code: string) {
  if (!P.showFilter) return;
  if (!code.startsWith("Key") && !code.startsWith("Digit")) return;
  const inputEl = filterInput.value?.$el?.querySelector("input");
  if (document.activeElement !== inputEl) {
    if (inputEl) {
      filterValue.value += key;
      setTimeout(() => {
        inputEl.focus();
      }, 0);
    }
  }
}

function getFocusList() {
  let ok = false;
  let focusIndex = -1;
  const list: HTMLElement[] = [];
  const selBaselist = selBase.value?.$el.querySelectorAll("button") || [];
  if (selBaselist && selBaselist.length > 0) {
    ok = true;
    let index = 0;
    if (P.showFilter) {
      const fInput = filterInput.value?.$el.querySelector("input") as HTMLInputElement;
      if (document.activeElement === fInput) focusIndex = 0;
      list.push(filterInput.value?.$el.querySelector("input") as HTMLElement);
      index++;
    }
    selBaselist?.forEach((ele: HTMLElement) => {
      if (document.activeElement === ele) focusIndex = index;
      list.push(ele);
      index++;
    });
  }
  return { ok, focusIndex, list };
}
</script>
<style>
@layer components {
  .H_select {
    border-radius: 4px;
    width: 100%;
  }

  .H_select_input {
    padding: 0 0.2em;
  }

  .H_select:focus .H_select_input {
    border-color: var(--col-pri);
  }

  .H_select_input_value {
    width: 100%;
    margin: 0 0.2em;
    overflow: hidden;
    text-align: left;
    user-select: text;
  }

  .H_select_input_icon {
    color: var(--col-2);
    transition-duration: 200ms;
  }

  .H_select_input_icon.isopen {
    transform: rotate(180deg);
  }

  .H_select__list {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    height: 100%;
    background-color: var(--bgcol-2);
    color: currentColor;
  }
  .H_select__list_search_icon {
    font-size: 1.2em;
    color: var(--col-2);
    margin: 0 -4px 0 0;
    pointer-events: none;
  }

  .H_select__list_selectbase {
    padding: 0.625em;
    --h-color: var(--col-pri);
    --h-color-contrast: white;
  }
}
</style>
