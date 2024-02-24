<template>
  <H_inputBase
    :label="label"
    :clearable="clearable"
    :HelpTextStart="hintStart"
    :HelpTextEnd="stringCounter"
    :disabled="disabled"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    @clearClick="$emit('update:modelValue', '')"
    class="H_textarea"
  >
    <template v-slot:start><slot name="start" /></template>
    <template v-slot:end>
      <H_icon btn="standard" v-if="clearable && modelValue" icon="close" class="H_inputbase-clearicon" />
      <slot name="end" />
    </template>

    <textarea
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :rows="Number(rows)"
      :aria-label="label === '' ? 'No label' : label"
      :name="label === '' ? 'No name' : label"
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
import H_icon from "./H_icon.vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";

const P = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
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
});

const E = defineEmits(["update:modelValue", "input_click"]);

const focused = ref(false);
const input = ref<any>(null);
const onInput = (e: any) => (calculateInputHeight(), debouncedUpdate(e.target.value ?? ""));
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
    const scrollHeightEnd = scrollHeight < input.value.style.minHeight ? input.value.style.minHeight : scrollHeight;
    input.value.style.minHeight = scrollHeightEnd + "px";
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
    width: 100%;
    outline: none;
    color: var(--col-txt-1);
    background-color: transparent;
    border-style: none;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 7px;
    padding-bottom: 7px;

    resize: vertical;
    line-height: 1.2;
  }
}

.H_textarea__input.noGrow {
  resize: none;
  overflow: hidden;
}
</style>
