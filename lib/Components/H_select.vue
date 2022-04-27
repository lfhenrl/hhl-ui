<template>
  <div class="H_select" :open="popupOpen">
    <H_pop v-model="popupOpen" trigger="none" full-width class="H_select__pop">
      <template v-slot:referance>
        <H_input
          :model-value="modelValue"
          :label="label"
          readonly
          end-icon="expand_down"
          @end_icon_click="onClick"
          @input_click="onClick"
          class="H_select__input"
        />
      </template>
      <div class="H_select__popup col-bg-0">
        <H_input v-if="!hideFilter" v-model="searchText" clearable set-focus start-icon="search" class="H_select__seekbox" />
        <div class="H_select__popupInner">
          <div v-if="multi" class="H_select__list">
            <H_checkbox
              v-for="(val, key) in filter"
              :key="key"
              v-model="multiValue"
              size="sm"
              class="H_select_item"
              :value="val.value"
              :label="val.label"
            />
          </div>
          <div v-if="!multi" class="H_select__list">
            <H_radio
              v-for="(val, key) in filter"
              :key="key"
              v-model="optionValue"
              size="sm"
              class="H_select_item"
              :value="val.value"
              :label="val.label"
            />
          </div>
        </div>
      </div>
    </H_pop>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import H_pop from "./popup/H_pop.vue";
import H_input from "./H_input.vue";
import H_checkbox from "./H_checkbox.vue";
import H_radio from "./H_radio.vue";

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: "" },
  label: { type: String, default: "" },
  multi: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  selectData: { type: Array, default: [] },
  hideFilter: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue"]);

const searchText = ref("");
const popupOpen = ref(false);

const optionValue = computed({
  get: () => props.modelValue as string | number,
  set: (val: any) => {
    emit("update:modelValue", val);
    close();
  }
});

const multiValue = computed({
  get: () => props.modelValue as string[],
  set: (val: any) => {
    emit("update:modelValue", val);
  }
});

const list = computed(() => {
  return props.selectData.map((ele: any) => {
    return {
      value: ele.value ? ele.value : ele,
      label: ele.label ? ele.label : ele
    };
  });
});

const filterFunc = (item: any) => item.label.toLowerCase().includes(searchText.value.toLowerCase());
const filter = computed(() => list.value.filter(filterFunc));
const close = () => (popupOpen.value = false);
const onClick = () => {
  if (props.readonly) {
    popupOpen.value = false;
    return;
  }

  popupOpen.value = !popupOpen.value;
  console.log("VIS", popupOpen.value);
};
</script>

<style>
.H_select {
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  line-height: 1em;
}

.H_select__pop {
  width: 100%;
}

.H_select__pop > .H_pop__referance {
  display: block;
  margin: 0;
  padding: 0;
}

.H_select__input {
  width: 100%;
}

.H_select[open="true"] .endIcon {
  transform: rotate(180deg);
}

.H_select__popup {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  padding-top: 1px;
  border: solid 1px var(--comp-border-color);
  box-shadow: var(--comp-shadow);
}

.H_select__popupInner {
  display: flex;
  flex: 1;
  overflow: auto;
  margin-top: 6px;
}

.H_select__seekbox > .H_inputBase__fieldset {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--comp-border-color);
}

.H_select .endIcon {
  --H_icon-size: 1.8em;
}

.H_select__seekbox {
  max-height: 22px;
  margin: 0;
}

.H_select__list {
  display: flex;
  flex-direction: column;
  margin: 5px 0 5px 9px;
}

.H_select_item {
  margin-bottom: 4px;
}
</style>
