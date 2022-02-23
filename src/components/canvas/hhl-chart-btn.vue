<template>
  <H_btn
    @click="click"
    small
    round
    flat
    :start-icon="types[type].icon"
    color="/var(--col-pri)"
    :title="types[type].title"
    :disabled="types[type].disabled"
  />
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { iHHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-btn-zoomfit",
  props: {
    type: { type: String, default: "zoomfit" }
  },
  setup(props) {
    const ch = inject("ch") as iHHLchart;
    const types = reactive({
      zoomfit: {
        action: ch.ZoomX.bind(ch),
        icon: "zoom_out_map",
        title: "Zoom to fit",
        disabled: true
      },
      print: {
        action: ch.Print.bind(ch),
        icon: "print",
        title: "Print",
        disabled: true
      },
      refresh: {
        action: ch.Refresh.bind(ch),
        icon: "refresh",
        title: "Refresh data",
        disabled: false
      }
    });

    ch.Event.on("update", () => {
      console.log("qq", ch.X.zoomFaktor !== 1);
      types.zoomfit.disabled = ch.X.zoomFaktor === 1;
      types.print.disabled = ch.Data.items.length < 1;
    });

    function click() {
      types[props.type].action();
    }

    return {
      click,
      types
    };
  }
});
</script>

<style>
.hhl-chart-btn-zoomfit {
  overflow: auto;
}
</style>
