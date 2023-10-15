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
        class="h_select max-h-[36px] min-h-[36px] flex-1"
        :label="label"
        :start-icon="startIcon"
        :end-icon="isOpen ? 'expand_up' : 'expand_down'"
        :HelpTextStart="HelpTextStart"
        :HelpTextEnd="HelpTextEnd"
        :disabled="disabled"
        :ErrorMessage="validate"
        :err_text="validate"
        :err_label="label"
      >
        <input
          type="text"
          class="h_select-input inline-block max-h-[34px] min-h-[34px] w-full flex-1 appearance-none overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent px-2.5 align-bottom text-txt1 outline-none"
          :maxlength="counter"
          :value="labelValue"
          @focus="focused = true"
          @blur="focused = false"
          readonly
          :name="label"
        />
      </H_inputbase>
    </template>
    <div class="h_select-list rounded border border-bg4 bg-bg0">
      <div
        class="h_select-filter flex items-center gap-1 border-b px-1.5 py-1"
        v-if="!hideFilter"
      >
        <H_icon icon="search" class="text-txtCol-3" />
        <input
          type="text"
          class="min-h-[24px inline-flex max-h-[24px] w-2 min-w-[50px] appearance-none overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent align-bottom text-txt1 outline-none"
          :maxlength="counter"
          :value="filter"
          @input="onInput"
          name="filter"
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
