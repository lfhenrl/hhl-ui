<template>
  <div class="H_select">
    <H_popover ref="popup" v-model="selectOpen" trigger="none" :readonly query-selector=".H_inputbase-inputBox">
      <template #referance>
        <H_inputbase
          class="H_select_input"
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
              class="focus:outline-none"
            />
          </template>
          <div set-end class="H_select-dropdownArrow">
            <div class="H_select-dropdownArrow-span">❮</div>
          </div>
        </H_inputbase>
      </template>
      <div class="H_select-list">
        <div class="H_select-filterbox" v-if="showFilter || selectAll">
          <div v-if="selectAll" @click="SelectAll" class="H_selectbase-item" :selected="allSelected ? '' : undefined">
            <span>Select All.</span>
          </div>
          <H_input v-if="showFilter" v-model="filterValue" class="H_selectBox-filter" clearable>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="height: 1.4em; width: 1.4em"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </H_input>
        </div>

        <H_selectbase v-model:label="labelValue" :multi v-model="model" :list :filter="filterValue" />
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import H_popover from "./H_popover.vue";
import H_inputbase from "./H_inputbase.vue";
import H_input from "./H_input.vue";
import H_selectbase from "./H_selectbase.vue";
const P = defineProps({
  label: { type: String, default: "" },
  list: { type: Array, default: [] },
  multi: { type: Boolean, default: false },
  selectAll: { type: Boolean, default: false },
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

<style>
@layer hhl-components {
  .H_select {
    flex: 1 1 100%;
    width: 100%;
    font-size: 1rem;
  }

  .H_select .H_inputbase-input input {
    width: 100%;
    background-color: transparent;
  }

  .H_select .H_popover .H_popover-popup {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px;
    line-height: 0;
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

  .H_select-dropdownArrow {
    font-family: monospace;
    font-weight: bold;
    padding-right: 8px;
    pointer-events: none;
  }
  .H_select .H_select-dropdownArrow-span {
    transform: rotate(-90deg);
  }
  .H_select:has(.H_popover-popup:popover-open) .H_select-dropdownArrow-span {
    transform: rotate(90deg);
  }

  .H_select-input {
    align-items: center;
    flex: 1 1 0%;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }

  .H_select-list {
    background-color: var(--col-bg-0);
    border-radius: 4px;
  }

  .H_select-filterbox {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px 0;
  }

  .H_selectBox-filter {
    display: inline-flex;
    margin: 0;
    margin-top: -10px;
    margin-bottom: -10px;
  }

  .H_select-icon {
    color: var(--col-txt-3);
  }

  .H_selectPop .H_baseSelectList-item.focused {
    border: 1px solid var(--col-pri);
  }
}
</style>
