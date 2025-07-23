<template>
  <div ref="timeSelector" class="H_timeSelector">
    <span @focus="onFocus($event, 'hour')" :selected="timeBase === 'hour'" tabindex="0" autofocus>{{ time.hour }}</span>
    <span>:</span>
    <span @focus="onFocus($event, 'minute')" :selected="timeBase === 'minute'" tabindex="0">{{ time.minute }}</span>
    <span v-if="showSeconds">:</span>
    <span v-if="showSeconds" @focus="onFocus($event, 'second')" :selected="timeBase === 'second'" tabindex="0">{{
      time.second
    }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  timeBase: { type: String, default: "hour" },
  time: { type: Object, default: { hour: "09", minute: "11", second: "22" } },
  showSeconds: { default: false, type: Boolean },
});
const E = defineEmits(["baseChanged"]);

function onFocus(e: FocusEvent, value: string) {
  E("baseChanged", value);
}
</script>

<style>
@layer components {
  .H_timeSelector {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg5);
    padding: 4px;
    outline: none;
    span {
      cursor: pointer;
      font-size: 1.3em;
      text-box-trim: trim-both;
      padding-inline: 0.1em;
      padding-block: 0.05em;
      border-radius: 4px;
      outline: none;
      &[selected="true"] {
        background-color: var(--color-pri);
        color: var(--color-priTxt);
      }
    }
  }
}
</style>
