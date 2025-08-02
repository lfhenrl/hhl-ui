<template>
  <div class="H_monthTable h_bg6 h_outline-none" @click="click">
    <div class="year-selector h_flex h_items-center h_justify-between h_font-bold h_user-select-none">
      <H_icon name="expand_left" size="1.6rem" btn data-value="yearMinus" tabindex="-1" />
      {{ date.year }}
      <H_icon name="expand_right" size="1.6rem" btn data-value="yearPlus" tabindex="-1" />
    </div>
    <div class="H_monthTable__table h_grid" tabindex="-1">
      <div
        class="h_flex h_items-center h_justify-center h_cursor-pointer h_rounded h_font-bold h_user-select-none"
        v-for="(item, index) in monthArray"
        :data-value="index"
        :selected="isSelected(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../Components/H_icon.vue";
const P = defineProps({
  date: { type: Object, default: { date: 9, month: 0, year: 2025 } },
  monthArray: { type: Array, default: () => [] },
});
const E = defineEmits(["baseChanged"]);

function click(e: MouseEvent) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.dataset.value !== undefined) {
    if (target.dataset.value === "yearMinus") {
      E("baseChanged", "year");
      P.date.year -= 1;
      return;
    }
    if (target.dataset.value === "yearPlus") {
      E("baseChanged", "year");
      P.date.year += 1;
      return;
    }
    P.date.month = parseInt(target.dataset.value);
    E("baseChanged", "month");
    console.log("click:", target.dataset.value);
  }
}

function isSelected(month: number) {
  if (P.date.month === month) {
    return "";
  } else {
    return undefined;
  }
}
</script>

<style>
@layer components {
  .H_monthTable {
    .year-selector {
      padding-inline: 0.5em;
      padding-block: 0.25em;
      font-size: 1.2em;
      border-bottom: 1px solid var(--color-bg1);
      border-top: 1px solid var(--color-bg1);
    }
    .H_monthTable__table {
      grid-template-columns: repeat(3, 5.3em);
      grid-template-rows: repeat(4, 3.5em);
      padding: 0.5em;

      div {
        font-size: 1.2em;
        padding: 0.5em;
        &[selected] {
          background-color: var(--color-pri);
          color: var(--color-priTxt);
        }
        &:hover {
          background-color: var(--color-warn);
        }
      }
    }
  }
}
</style>
