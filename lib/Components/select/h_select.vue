<template>
  <H_pop
    class="h_selectPop"
    v-model="isOpen"
    full-width
    :disabled="disabled ? 'true' : null"
    :readonly="readonly"
  >
    <template v-slot:referance>
      <H_inputbase
        class="h_select"
        :label="label"
        :start-icon="startIcon"
        :end-icon="isOpen ? 'expand_up' : 'expand_down'"
        :HelpTextStart="HelpTextStart"
        :HelpTextEnd="HelpTextEnd"
        :disabled="disabled"
        :movelabel="move_label"
        :ErrorMessage="validate"
        :err_text="validate"
        :err_label="label"
      >
        <input
          type="text"
          class="h_select-input"
          :maxlength="counter"
          :value="labelValue"
          @focus="focused = true"
          @blur="focused = false"
          readonly
        />
      </H_inputbase>
    </template>
    <div class="h_select-list">
      <div class="h_select-filter" v-if="!hideFilter">
        <H_icon icon="search" class="text-txtCol-3" />
        <input
          type="text"
          class="h_select-filter-input"
          :maxlength="counter"
          :value="filter"
          @input="onInput"
        />
        <H_icon
          btn
          v-if="filter != ''"
          icon="close"
          class="text-txtCol-3"
          @click.stop="filter = ''"
        />
      </div>
      <H_baseSelectList
        :modelValue="modelValue"
        v-model:labelValue="labelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        listGap="5px"
        labelGap="10px"
        :multi="multi"
        :list="list"
        :filter="filter"
      />
    </div>
  </H_pop>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import H_baseSelectList from "../../SubComponents/H_baseSelectList.vue";
import H_inputbase from "../../SubComponents/H_inputBase.vue";
import { debounce } from "../../utils/debounce";
import { validateFunc } from "../../utils/validateFunc";
import H_icon from "../H_icon.vue";
import H_pop from "../popup/H_pop.vue";

const P = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hideFilter: { type: Boolean, default: false },
  startIcon: { type: String, default: "" },
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  validator: Array,
});

defineEmits(["update:modelValue"]);

const focused = ref(false);
const filter = ref("");
const isOpen = ref(false);
const labelValue = ref("");

// const LabelValue = computed(() => {
//   if (P.multi) {
//     return P.list.includes(P.modelValue);
//   } else {
//     return P.list.includes(P.modelValue);
//   }
// });

const move_label = computed(() => {
  if (P.startIcon != "") return true;
  if (P.modelValue != "") return true;
  if (focused.value) return true;
  return false;
});

watch(
  () => P.modelValue,
  () => {
    if (!P.multi) isOpen.value = false;
  },
);

const debouncedUpdate = debounce(function (val: string) {
  filter.value = val;
}, P.debounce);

const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
.h_inputbase.h_select {
  position: relative;
  background-color: inherit;
  max-height: 40px;
}

.h_selectPop .h_pop__referance {
  display: flex;
}

.h_select-input {
  display: inline-block;
  box-sizing: border-box;
  flex: 1 1;
  padding: 0 10px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  color: var(--col-txt-1);
  vertical-align: bottom;
  background-color: transparent;
  border: none;
  width: 100%;
  overflow: hidden;
  appearance: none;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.h_select-list {
  width: 100%;
  background-color: var(--col-bg-0);
  box-shadow: var(--shadow-4);
  border: 1px solid var(--col-txt-5);
  border-radius: 4px;
}

.h_select-filter {
  display: flex;
  border-bottom: 1px solid var(--col-txt-5);
  align-items: center;
  gap: 6px;
  padding: 3px 6px;
}

.h_select-filter-input {
  flex: 1;
  margin: 0;
  font: inherit;
  font-size: 1rem;
  color: currentColor;

  border: 0;
  padding: 0;
  padding-top: 0;
  height: 1.1876em;
  display: block;
  background: none;
  /*    background-color: dimgrey;*/
  position: relative;
  box-sizing: border-box;
  letter-spacing: inherit;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  align-self: center;
  justify-self: stretch;
  min-width: none;
  width: 33px;
}
</style>
