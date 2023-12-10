<template>
  <H_pop
    class="H_selectPop"
    v-model="isOpen"
    full-width
    :offsetTop="5"
    :disabled="disabled ? 'true' : null"
    :readonly="readonly"
    @close="selecClose"
  >
    <template v-slot:referance>
      <H_inputbase
        class="H_select"
        :label="label"
        :end-icon="isOpen ? 'expand_up' : 'expand_down'"
        :HelpTextStart="HelpTextStart"
        :HelpTextEnd="HelpTextEnd"
        :disabled="disabled"
        :ErrorMessage="validate"
        :err_text="validate"
        :err_label="label"
        @keydown.down.prevent.stop="isOpen = true"
        tabindex="0"
      >
        <input
          ref="selectInput"
          type="text"
          class="H_select-input H_select-input-reset"
          :maxlength="counter"
          :value="labelValue"
          readonly
          :name="label"
          tabindex="0"
        />
        <template v-slot:start>
          <slot name="start" />
        </template>
        <template #end>
          <H_icon btn="standard" icon="expand_up" v-if="isOpen" />
          <H_icon btn="standard" icon="expand_down" v-else />
        </template>
      </H_inputbase>
    </template>
    <div class="H_select-list">
      <div class="H_select-filter" v-if="!hideFilter">
        <H_icon icon="search" size="20px" class="H_select-icon" />
        <input
          type="text"
          class="H_select-filter-input H_select-input-reset"
          :maxlength="counter"
          :value="filter"
          @input="onInput"
          name="filter"
          @keyup.enter.prevent="KeyEnter"
          @keydown.up.prevent="KeyUp"
          @keydown.down.prevent="KeyDown"
          @keydown.escape.prevent="KeyEscape"
        />
        <H_icon
          btn="standard"
          v-if="filter != ''"
          icon="close"
          class="H_select-icon"
          size="20px"
          @click.stop="filter = ''"
        />
      </div>
      <H_baseSelectList
        ref="baseSelectList"
        :modelValue="modelValue"
        v-model:labelValue="labelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        listGap="5px"
        labelGap="3px"
        labelLeft
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
  HelpTextStart: { type: String, default: "" },
  HelpTextEnd: { type: String, default: "" },
  counter: { type: String, default: "" },
  debounce: { type: Number, default: 200 },
  multi: { type: Boolean, default: false },
  list: { type: Array, default: ["nr1", "nr2", "nr3", "nr4"] },
  validator: Array,
});

defineEmits(["update:modelValue"]);

const selectInput = ref<any>();
const baseSelectList = ref<any>();
const filter = ref("");
const isOpen = ref(false);
const labelValue = ref("");

function KeyDown() {
  baseSelectList.value?.KeyDown();
}

function KeyUp() {
  baseSelectList.value?.KeyUp();
}

function KeyEnter() {
  baseSelectList.value?.KeyEnter();
}

function KeyEscape() {
  isOpen.value = false;
}

function selecClose() {
  filter.value = "";
  selectInput.value.focus();
}

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
@layer hhl-components {
  .H_select {
    max-height: 36px;
    min-height: 36px;
    height: 36px;
    flex: 1 1 0%;
  }

  .H_select-input-reset {
    outline: none;
    color: var(--col-txt-1);
    vertical-align: bottom;
    background-color: transparent;
    border-style: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    appearance: none;
  }

  .H_select-input {
    display: inline-flex;
    align-items: center;
    flex: 1 1 100%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .H_select-list {
    background-color: var(--col-bg-0);
    border: 1px solid var(--col-bg-4);
    border-radius: 4px;
  }

  .H_select-filter {
    display: flex;
    align-items: center;
    gap: 4px;
    border-bottom: 1px solid var(--col-bg-4);
    padding: 4px 12px;
  }

  .H_select-filter-input {
    display: inline-flex;
    flex: 1 1 0%;
    min-height: 24px;
    max-height: 24px;
    height: 24px;
    min-width: 50px;
  }

  .H_select-icon {
    color: var(--col-txt-3);
  }
}
</style>
