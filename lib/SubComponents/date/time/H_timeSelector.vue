<template>
  <div ref="timeSelector" class="H_timeSelector h_flex h_items-center h_justify-center h_bg4 h_outline-none">
    <span
      class="h_cursor-pointer h_rounded h_outline-none"
      @focus="onFocus($event, 'hour')"
      :selected="timeBase === 'hour'"
      tabindex="0"
      autofocus
      >{{ time.hour }}</span
    >
    <span class="h_cursor-pointer h_rounded h_outline-none">:</span>
    <span
      class="h_cursor-pointer h_rounded h_outline-none"
      @focus="onFocus($event, 'minute')"
      :selected="timeBase === 'minute'"
      tabindex="0"
      >{{ time.minute }}</span
    >
    <span class="h_cursor-pointer h_rounded h_outline-none" v-if="showSeconds">:</span>
    <span
      class="h_cursor-pointer h_rounded h_outline-none"
      v-if="showSeconds"
      @focus="onFocus($event, 'second')"
      :selected="timeBase === 'second'"
      tabindex="0"
      >{{ time.second }}</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  timeBase: { type: String, default: "hour" },
  time: { type: Object, default: { hour: "09", minute: "11", second: "22" } },
  showSeconds: { default: false, type: Boolean },
});
const E = defineEmits(["baseChanged"]);

function onFocus(_: FocusEvent, value: string) {
  E("baseChanged", value);
}
</script>

<style>
@layer components {
  .H_timeSelector {
    padding: 4px;
    span {
      font-size: 1.3em;
      text-box-trim: trim-both;
      padding-inline: 0.1em;
      padding-block: 0.05em;
      &[selected="true"] {
        background-color: var(--color-pri);
        color: var(--color-priTxt);
      }
    }
  }
}
</style>
