<template>
  <H_popover
    ref-class="h_select focus:outline-none"
    ref="popup"
    @toggled="selectToggled"
    offset-top="-1em"
    :disabled
    :readonly
    width-as-ref
    :autofocus
  >
    <template v-slot:referance>
      <div class="H_sel pointer-events-none text-left" tabindex="-1">
        <H_input
          class="overflow-hidden pointer-events-none"
          v-model="labelValue"
          :label="label"
          readonly
          :disabled
          :placeholder
          :hintStart
          :hintEnd
          :validator
          tabindex="-1"
        >
          <slot />
          <H_icon
            btn
            name="expand_down"
            color="txt2"
            set-end
            tabindex="-1"
            class="pointer-events-none -mr-1 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </H_input>
      </div>
    </template>
    <div class="H_sel-list flex flex-col bg-bg0 rounded inset-ring inset-ring-bg4 h-full" @keydown="keyDown">
      <H_input v-if="showFilter" ref="filterInput" narrow v-model="filterValue" clearable class="mx-2 mt-2 w-fit">
        <H_icon name="search" color="txt2" size="1.2em" set-end />
      </H_input>
      <H_selectbase
        class="p-2.5"
        ref="selBase"
        :color="col.txt"
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
      />
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { ref, toRef, useTemplateRef, watch, type PropType } from "vue";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import H_selectbase from "./H_selectbase.vue";
import H_popover from "./H_popover.vue";
import H_input from "./H_input.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  ...useColorProp("pri"),
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

const col = useColor(toRef(() => P.color));
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
  .h_select:focus .H_inputbase-slot {
    border-color: var(--color-pri);
  }
}
</style>
