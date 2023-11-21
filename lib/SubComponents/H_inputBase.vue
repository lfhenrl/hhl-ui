<template>
  <label
    class="h_inputbase group relative grid min-w-[100px] grid-cols-[auto_1fr_auto_auto] grid-rows-[auto_auto_auto] rounded border border-txt5 focus-within:border-pri data-[error]:border-err"
    @click="Click"
    :disabled="disabled ? true : undefined"
    :data-error="ErrorMessage != '' ? true : undefined"
  >
    <div
      class="h_inputbase-label pointer-events-none absolute col-span-4 col-start-1 row-start-1 mt-[-22px] select-none text-[14px] text-txt2 group-focus-within:text-pri group-data-[error]:text-err"
    >
      {{ label }}
    </div>
    <H_icon
      v-if="startIcon != ''"
      :icon="startIcon"
      class="h_inputbase-starticon col-start-1 row-start-2 ml-1 self-center text-txt3"
      :btn="stBtn ? true : null"
    />
    <H_icon
      v-if="endIcon != ''"
      :icon="endIcon"
      class="h_inputbase-endicon col-start-4 row-start-2 mr-1 w-[22px] self-center text-txt3 pointer-events-none"
      :btn="endBtn ? true : null"
    />
    <H_icon
      btn
      v-if="clearable"
      class="h_inputbase-clearicon col-start-3 row-start-2 mr-1 w-[22px] self-center text-txt3"
    />
    <div class="col-start-2 row-start-2 flex w-full flex-col">
      <slot />
    </div>

    <div
      class="col-span-4 col-start-1 row-start-3 flex max-h-0 w-full select-none justify-between overflow-visible px-0.5 pt-0.5 text-xs text-txt2"
    >
      <template v-if="ErrorMessage == ''">
        <div>{{ HelpTextStart }}</div>
        <div>{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="text-err">{{ ErrorMessage }}</div>
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
</script>
