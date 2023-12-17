<template>
  <H_inputBase
    :label="label"
    :clearable="clearable"
    :start-icon="startIcon"
    :end-icon="endIcon"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    :stBtn="onStartIconClick !== null"
    :endBtn="onEndIconClick !== null"
    @clearClick="$emit('update:modelValue', '')"
    @startIconClick="$emit('startIconClick')"
    @endIconClick="$emit('endIconClick')"
    class="H_textarea"
  >
    <textarea
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :rows="Number(rows)"
      :aria-label="label"
      :name="label"
      @input="onInput"
      @click="$emit('input_click')"
      @focus="handleFocus"
      @blur="handleBlur"
      autocomplete="off"
      :class="{ noGrow: !noGrow }"
      class="H_textarea__input"
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  validator: Array,
  rows: { type: String, default: "1" },
  noGrow: { type: Boolean, default: false },
  onStartIconClick: { type: Function, default: null },
  onEndIconClick: { type: Function, default: null },
});

const E = defineEmits([
  "update:modelValue",
  "input_click",
  "startIconClick",
  "endIconClick",
]);

const focused = ref(false);
const input = ref<any>(null);
const onInput = (e: any) => (
  calculateInputHeight(), debouncedUpdate(e.target.value ?? "")
);
const validate = computed(() => validateFunc(P.validator, P.modelValue));

const focus = () => input.value?.focus();
const handleFocus = () => (focused.value = true);
const handleBlur = () => (focused.value = false);

const stringCounter = computed(() => {
  if (P.counter == "") return P.hintEnd;
  let c = P.modelValue.toString().length;
  return c.toString() + "/" + P.counter;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", val);
}, P.debounce);

defineExpose({ focus });

onMounted(() => calculateInputHeight());

function calculateInputHeight() {
  if (input.value && !P.noGrow) {
    input.value.style.height = "0";
    const scrollHeight = input.value.scrollHeight;
    input.value.style.minHeight = scrollHeight + "px";
    console.log(input.value.style.height);
  }
}
</script>
<style>
@layer hhl-components {
  .H_textarea {
    flex: 1 1 0%;
    min-height: 36px;
  }

  .H_textarea__input {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    width: 100%;
    outline: none;
    color: var(--col-txt-1);
    background-color: transparent;
    border-style: none;
    padding: 2px 10px;
    resize: vertical;
  }
}

.H_textarea__input.noGrow {
  resize: none;
  overflow: hidden;
}
</style>
