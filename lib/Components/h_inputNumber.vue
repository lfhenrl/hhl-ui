<template>
  <H_inputBase
    class="H_inputNumber"
    :label="label"
    :clearable="clearable"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :disabled="disabled"
    :movelabel="move_label"
    :ErrorMessage="validate"
    :err_text="validate"
    :err_label="label"
    @clearClick="$emit('update:modelValue', 0)"
  >
    <template v-slot:start>
      <slot name="start" />
    </template>
    <template v-slot:end>
      <slot name="end" />
    </template>

    <div class="H_inputText-container">
      <input
        type="number"
        class="H_inputText-input"
        :value="Numbervalue"
        inputmode="numeric"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
        @click="$emit('inputClick')"
        :readonly="readonly"
        :aria-label="label === '' ? 'No label' : label"
        :name="label === '' ? 'No name' : label"
        autocomplete="off"
      />
      <div class="H_inputNumber-clearBtn">
        <H_icon
          btn="standard"
          v-if="clearable && Numbervalue"
          icon="close"
          class="H_inputbase-clearicon"
        />
      </div>
      <div class="H_inputNumber-icons">
        <H_icon
          btn="standard"
          @click.stop="CountUp"
          :disabled="readonly"
          icon="expand_up"
          class="H_inputNumber-iconup"
        />
        <H_icon
          btn="standard"
          @click.passive="CountDown"
          :disabled="readonly"
          icon="expand_down"
          class="H_inputNumber-icondown"
        />
      </div>
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { debounce } from "../utils/debounce";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import H_icon from "./H_icon.vue";

const P = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  label: { type: String, default: "" },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  step: { type: Number, default: 1 },
  debounce: { type: Number, default: 200 },
  validator: { type: Array, default: [] },
});

const E = defineEmits(["update:modelValue", "inputClick"]);
const focused = ref(false);
const Numbervalue = ref(P.modelValue);

watch(
  () => P.modelValue,
  () => {
    Numbervalue.value = P.modelValue;
  }
);

const move_label = computed(() => {
  if (P.modelValue != null) return true;
  if (focused.value) return true;
  return false;
});

const debouncedUpdate = debounce(function (val: string) {
  E("update:modelValue", parseFloat(val));
}, P.debounce);

const onInput = (e: any) => debouncedUpdate(e.target.value ?? "");
const CountUp = () => (
  (Numbervalue.value = Number(Numbervalue.value) + Number(P.step)),
  debouncedUpdate(Numbervalue.value)
);

const CountDown = () => (
  (Numbervalue.value = Number(Numbervalue.value) - Number(P.step)),
  debouncedUpdate(Numbervalue.value)
);

const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
@layer hhl-components {
  .H_inputNumber {
    max-height: 36px;
    min-height: 36px;
    height: 36px;
    flex: 1 1 0%;
  }

  .H_inputText-container {
    display: flex;
  }

  .H_inputText-input {
    display: inline-flex;
    align-items: center;
    max-height: 36px;
    min-height: 36px;
    width: 100%;
    flex: 1 1 0%;
    appearance: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-style: none;
    background-color: transparent;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 2px;
    color: var(--col-txt-1);
    outline: none;
  }

  .H_inputText-input::-webkit-outer-spin-button,
  .H_inputText-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .H_inputNumber-clearBtn {
    display: flex;
    align-items: center;
  }

  .H_inputNumber-icons {
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    color: var(--col-txt-3);
    width: 20px;
    height: 100%;
  }

  .H_inputNumber-iconup {
    position: absolute;
    left: -3px;
    top: -4px;
  }

  .H_inputNumber-icondown {
    position: absolute;
    left: -3px;
    bottom: -3px;
  }
}
</style>
