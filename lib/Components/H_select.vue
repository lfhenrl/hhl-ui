<template>
  <div class="H_select w-full">
    <H_popover ref="popup" v-model="selectOpen" trigger="none" :readonly query-selector=".H_inputbase-slot">
      <template #referance>
        <H_inputbase
          class="H_select_input"
          @clear="model = null"
          :label="label"
          :disabled="disabled ? '' : undefined"
          :readonly
          :HelpTextStart="hintStart"
          :HelpTextEnd="hintEnd"
          :ErrorMessage="validate"
          :narrow
        >
          <div class="H_inputbase-inputBox grid grid-cols-[auto_1fr_auto] w-full h-full *:row-start-1 max-h-[1.875em]">
            <slot> </slot>
            <input
              ref="el"
              :value="labelValue"
              readonly
              :disabled="disabled"
              autocomplete="off"
              type="string"
              :placeholder="placeholder"
              class="col-start-2 w-full bg-transparent border-none appearance-none focus:outline-none"
            />
          </div>
          <H_iconExpand_up color="txt1" set-end v-if="selectOpen" />
          <H_iconExpand_down color="txt1" set-end v-else />
        </H_inputbase>
      </template>
      <div @click.stop class="H_select-list bg-bg0 rounded w-full border border-solid border-bg4">
        <div
          v-if="showFilter"
          class="flex w-full items-center border-b border-bg4 border-solid h-8 pl-1 mb-2 rounded-t"
        >
          <H_iconSearch color="txt3" />
          <input v-model="filterValue" class="H_selectBox-filter focus:outline-none bg-transparent w-full pl-2" />
        </div>
        <div
          v-if="selectAll && multi"
          @click="SelectAll"
          class="H_selectbase-item flex items-center mt-2 px-3"
          :selected="allSelected ? '' : undefined"
        >
          <span class="text-sm ml-2">Select All.</span>
        </div>

        <H_selectbase
          v-model:label="labelValue"
          :multi
          v-model="model"
          :list
          :filter="filterValue"
          :listGap="listGap"
          :labelGap="labelGap"
          class="px-3 py-2"
        />
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import H_popover from "./H_popover.vue";
import H_inputbase from "./H_inputbase.vue";
import H_selectbase from "./H_selectbase.vue";
import { validateFunc } from "../utils/validateFunc";
const P = defineProps({
  label: { type: String, default: "" },
  list: { type: Array, default: [] },
  multi: { type: Boolean, default: false },
  selectAll: { type: Boolean, default: true },
  placeholder: { type: String, default: "" },
  showFilter: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  narrow: { type: Boolean, default: false },
  labelGap: { type: String, default: "8px" },
  listGap: { type: String, default: "3px" },
  validator: Array,
});

const popup = ref<InstanceType<typeof H_popover> | null>(null);
const el = ref<HTMLInputElement | null>(null);
const model: any = defineModel();
const selectOpen = ref(false);
const labelValue = ref("");
const filterValue = ref("");

watch(model, () => {
  if (P.multi) return;
  selectOpen.value = false;
});

const listString = computed(() => {
  return P.list.map((ele: any) => (ele.value ? ele.value : ele)).toString();
});

const allSelected = computed(() => {
  if (!P.multi) return false;
  return listString.value === model.value;
});

function SelectAll() {
  if (!P.multi) return;
  model.value = listString.value;
  if (allSelected.value) {
    model.value = "";
  } else {
    model.value = listString.value;
  }
}

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
