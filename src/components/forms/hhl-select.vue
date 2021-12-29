<template>
  <div class="hhl-select flx-1" :open="popupOpen">
    <hhl-pop
      v-model="popupOpen"
      trigger="none"
      full-width
      offset-when-up="11"
      :min-height="minHeight"
      :min-width="minWidth"
      :max-width="maxWidth"
      :max-height="maxHeight"
      reference-full-width
    >
      <template v-slot:reference>
        <hhl-input
          :model-value="modelValue"
          :label="label"
          readonly
          end-icon="expand_down"
          @end_icon_click="onClick"
          @input_click="onClick"
          class="w-100"          
        />
      </template>
      <div class="border borderColor-comp flx-col flx-1 borderRadius-4 pt-1 col-bg-0 shadow-4">
        <hhl-input
          v-if="!hideFilter"
          v-model="searchText"
          clearable
          set-focus
          start-icon="search"
          class="hhl-select__seekbox m-0"
        />
        <div class="flx-row flx-1 overflow-auto m-0">
          <div v-if="multi" class="hhl-select__list flx-col ml-9 mt-5 mb-5">
            <hhl-checkbox
              v-for="(val, key) in filter"
              :key="key"
              v-model="multiValue"
              class="hhl-select_item"
              :value="val.value"
              :label="val.label"
            />
          </div>
          <div v-if="!multi" class="hhl-select__list flx-col ml-9 mt-5 mb-5">
            <hhl-radio
              v-for="(val, key) in filter"
              :key="key"
              v-model="optionValue"
              class="hhl-select_item mb-2"
              :value="val.value"
              :label="val.label"
              size="18px"
            />
          </div>
        </div>
      </div>
    </hhl-pop>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

const hhlSelect = defineComponent({
  name: "hhl-select",
  props: {
    modelValue: { type: [String, Number, Array], default: "" },
    label: { type: String, default: "" },
    multi: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    maxWidth: { type: String, default: "none" },
    minWidth: { type: String, default: "200px" },
    maxHeight: { type: String, default: "400px" },
    minHeight: { type: String, default: "60px" },
    selectData: { type: Array, default: [] },
    hideFilter: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const hhlSelectPop = ref(<HTMLElement | null>null);
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
    };

    return {
      hhlSelectPop,
      searchText,
      popupOpen,
      filter,
      onClick,
      close,
      optionValue,
      multiValue
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-select": typeof hhlSelect;
  }
}
export type ihhlSelect = InstanceType<typeof hhlSelect>;
export default hhlSelect;
</script>

<style>
.hhl-select {
  display: flex;
  --hhl-checkbox-size: 15px;
  --hhl-radio-size: 12px;
}

.hhl-select[open="true"] .endIcon {
  transform: rotate(180deg);
}

.hhl-select__seekbox fieldset {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--comp-border-color);
}

.hhl-select .endIcon {
  --hhl-icon-size: 1.8em;
}

.hhl-select__seekbox {
  max-height: 33px;
}
.hhl-select__seekbox {
  max-height: 33px;
}

/* .hhl-select_item {
  display: flex;
  font-size: 14px;
  padding: 0;
} */
</style>
