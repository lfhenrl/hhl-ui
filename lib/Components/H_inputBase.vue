<template>
  <div
    class="h_inputbase"
    @click="Click"
    :disabled="disabled ? true : undefined"
    :error="ErrorMessage != '' ? true : undefined"
  >
    <label ref="_label" class="h_inputbase-label" :move="movelabel">{{ label }}</label>
    <h_icon v-if="startIcon != ''" :icon="startIcon" class="h_inputbase-starticon" />
    <h_icon v-if="endIcon != ''" :icon="endIcon" class="h_inputbase-endicon" />
    <h_icon v-if="clearable" class="h_inputbase-clearicon" />
    <div class="h_inputbase-slot"><slot /></div>

    <div class="h_inputbase-HelpText">
      <template v-if="ErrorMessage == ''">
        <div>{{ HelpTextStart }}</div>
        <div>{{ HelpTextEnd }}</div>
      </template>
      <template v-else>
        <div class="text-err">{{ ErrorMessage }}</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
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
});

const E = defineEmits(["ClearClick", "click", "StartIconClick", "EndIconClick"]);
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
  setBgColor(_label.value);
});
</script>

<style>
.h_inputbase {
  display: inline-grid;
  grid-template-columns: auto 1fr auto auto;
  border: 1px solid red;
  position: relative;
  background-color: inherit;
  border-radius: 4px;
  gap: 0;
  padding: 0;
  width: 100%;
  min-height: 40px;
  min-width: 200px;
  --col-icon: var(--col-txt-3);
}

.h_inputbase[error] {
  border-color: var(--col-err);
}

.h_inputbase[error] .h_inputbase-label {
  color: var(--col-err);
}

.h_inputbase-label {
  display: inline;
  position: absolute;
  color: var(--col-txt-3);
  top: 0;
  left: 0;
  padding: 0 5px;
  line-height: 18px;
  background-color: inherit;
  pointer-events: none;
  user-select: none;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform: translate(10px, 10px) scale(1);
}

.h_inputbase:focus-within {
  border-color: var(--col-pri);
  border-width: 1px;
}

.h_inputbase:focus-within .h_inputbase-label {
  color: var(--col-pri);
}

.h_inputbase-slot {
  display: flex;
  flex-direction: column;
  grid-row: 1;
  grid-column: 2;
  width: 100%;
}

.h_inputbase-label[move="true"] {
  transform: translate(7px, -8px) scale(0.75);
  transform-origin: top left;
}

.h_inputbase-starticon {
  grid-row: 1;
  grid-column: 1;
  align-self: center;
  width: 22px;
  margin: 0;
  padding: 0;
  margin-left: 4px;
  color: var(--col-icon);
}

.h_inputbase-endicon {
  grid-row: 1;
  grid-column: 4;
  align-self: center;
  width: 22px;
  margin: 0;
  padding: 0;
  margin-right: 4px;
  color: var(--col-icon);
}

.h_inputbase-clearicon {
  grid-row: 1;
  grid-column: 3;
  align-self: center;
  width: 22px;
  margin: 0;
  padding: 0;
  margin-right: 4px;
  color: var(--col-icon);
}

.h_inputbase-HelpText {
  position: absolute;
  display: flex;
  flex-direction: row;
  grid-row: 2;
  grid-column: 1/5;
  font-size: 0.7rem;
  bottom: -17px;
  right: 3px;
  left: 3px;
  justify-content: space-between;
  color: var(--col-txt-2);
  user-select: none;
}
</style>
