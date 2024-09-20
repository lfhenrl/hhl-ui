<template>
  <div class="H_select w-full">
    <H_popover ref="popup" v-model="selectOpen" trigger="none" :readonly query-selector=".H_inputbase-inputBox">
      <template #referance>
        <H_inputbase
          class="H_select_input w-full"
          @clear="model = null"
          :label="label"
          :clearable="clearable && model !== null"
          :disabled="disabled ? '' : undefined"
          :readonly="readonly ? '' : undefined"
        >
          <slot> </slot>
          <template v-slot:input @click.stop.prevent>
            <input
              ref="el"
              :value="labelValue"
              readonly
              :disabled="disabled"
              autocomplete="off"
              type="string"
              :placeholder="placeholder"
              class="focus:outline-none bg-transparent w-full"
            />
          </template>
          <div set-end class="H_select-dropdownArrow ico-expand_down" :class="{ 'ico-expand_up': selectOpen }" />
        </H_inputbase>
      </template>
      <div class="H_select-list bg-bg0 rounded w-full">
        <div v-if="showFilter" class="flex w-full items-center border border-bg4 border-solid h-8 pl-1 mb-2 rounded-t">
          <div class="ico-search" />
          <input v-model="filterValue" class="H_selectBox-filter focus:outline-none bg-transparent w-full pl-2" />
        </div>
        <div
          v-if="selectAll && multi"
          @click="SelectAll"
          class="H_selectbase-item text-base mt-2 px-3"
          :selected="allSelected ? '' : undefined"
        >
          <span class="text-sm">Select All.</span>
        </div>

        <H_selectbase v-model:label="labelValue" :multi v-model="model" :list :filter="filterValue" class="px-3 py-2" />
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import H_popover from "./H_popover.vue";
import H_inputbase from "./H_inputbase.vue";
import H_selectbase from "./H_selectbase.vue";
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
</script>
