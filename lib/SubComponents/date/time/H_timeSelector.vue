<template>
  <div ref="timeSelector" class="H_timeSelector">
    <span
      class="H_timeSelector_value"
      @focus="onFocus($event, 'hour')"
      :selected="timeBase === 'hour'"
      tabindex="0"
      autofocus
      >{{ time.hour }}</span
    >
    <span class="H_timeSelector_space">:</span>
    <span
      class="H_timeSelector_value"
      @focus="onFocus($event, 'minute')"
      :selected="timeBase === 'minute'"
      tabindex="0"
      >{{ time.minute }}</span
    >
    <span class="H_timeSelector_space" v-if="showSeconds">:</span>
    <span
      class="H_timeSelector_value"
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg3);
    padding: 0.5em;
    outline-style: none;
  }
  .H_timeSelector_value {
    border-radius: 4px;
    cursor: pointer;
    outline-style: none;
    font-size: 1.3em;
    padding: 0.05em 0.1em;
    text-box-trim: trim-both;
  }
  .H_timeSelector_value[selected="true"] {
    background-color: var(--col-pri);
    color: white;
  }
  .H_timeSelector_space {
    font-size: 1.3em;
    padding: 0.05em 0.1em;
  }
}
</style>
