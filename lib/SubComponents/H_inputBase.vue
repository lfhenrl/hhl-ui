<template>
  <div
    class="h_inputbase group relative inline-grid min-h-[40px] min-w-[100px] grid-cols-[auto_1fr_auto_auto] rounded border border-txt5 data-[error]:border-err focus-within:border-pri"
    @click="Click"
    :disabled="disabled ? true : undefined"
    :data-error="ErrorMessage != '' ? true : undefined"
  >
    <label
      ref="_label"
      class="h_inputbase-label pointer-events-none absolute block translate-x-[10px] translate-y-[10px] scale-100 select-none px-1 leading-4 text-txt2 transition-transform group-data-[error]:text-err group-focus-within:text-pri data-[move='true']:translate-y-[-8px] data-[move='true']:translate-x-[-8px] data-[move='true']:scale-75"
      :data-move="movelabel"
      >{{ label }}</label
    >
    <H_icon
      v-if="startIcon != ''"
      :icon="startIcon"
      class="h_inputbase-starticon row-start-1 col-start-1 self-center w-[22px] ml-1 text-txt3"
      :btn="stBtn ? true : null"
    />
    <H_icon
      v-if="endIcon != ''"
      :icon="endIcon"
      class="h_inputbase-endicon row-start-1 col-start-4 self-center w-[22px] mr-1 text-txt3"
      :btn="endBtn ? true : null"
    />
    <H_icon btn v-if="clearable" class="h_inputbase-clearicon row-start-1 col-start-3 self-center w-[22px] mr-1 text-txt3" />
    <div class="flex flex-col w-full row-start-1 col-start-2"><slot /></div>

    <div class="absolute flex row-start-2 col-start-1 col-span-4 text-xs justify-between select-none text-txt2  w-full pt-0.5 px-0.5">
      <template v-if="ErrorMessage == ''">
        <div>{{ HelpTextStart }}</div>
        <div class="self-end">{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="text-err">{{ ErrorMessage }}</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_icon from "../Components/H_icon.vue";
import { onMounted, ref } from "vue";
import { setBgColor } from "../utils/setBgColorElement";

defineProps({
  label: { type: String, default: "Label" },
  movelabel: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  ErrorMessage: { type: String, default: "" },
  stBtn: { type: Boolean, default: false },
  endBtn: { type: Boolean, default: false },
});

const E = defineEmits([
  "ClearClick",
  "click",
  "StartIconClick",
  "EndIconClick",
]);
const _label: any = ref();
function Click(e: MouseEvent) {
  const ele = e.target as any;
  if (!ele) return null;
  let cl = ele.classList;
  if (cl.length === 0) cl = ele.parentElement.classList;

  if (cl.contains("h_inputbase-clearicon")) E("ClearClick");
  else if (cl.contains("h_inputbase-starticon")) E("StartIconClick");
  else if (cl.contains("h_inputbase-endicon")) E("EndIconClick");
  else E("click");
}

onMounted(() => {
  setTimeout(() => {
    setBgColor(_label.value);
  }, 20);
});
</script>
