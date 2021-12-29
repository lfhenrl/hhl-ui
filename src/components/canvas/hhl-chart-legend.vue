<template>
  <div class="hhl-chart-legend">
    <div class="hhl-chart-legend-box" v-for="(item, index) in list" :key="index" :active="item.active" @click="click(item)">
      <div class="hhl-chart-legend-color" :style="{ backgroundColor: item.color }" />
      <div class="hhl-chart-legend-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRaw } from "vue";
import { iHHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-legend",
  props: {
    colors: { type: Array, default: ["black", "#04e304", "red", "yellow", "orange", "#ffcc99", "blueviolet"] },
    titles: { type: Array, default: ["Idle", "Production", "Stop", "Change over", "Cleaning", "Prolonged", "Unknown"] }
  },
  setup(props, {}) {
    const ch = inject("ch") as iHHLchart;

    const colorList = {};

    props.colors.forEach((item, index) => {
      const _item = (item as string) || "";

      colorList[_item] = {
        title: props.titles[index] || "????",
        color: _item,
        active: true
      };
    });

    let list = reactive(<any>colorList);
    ch.ColorList = toRaw(list);

    function click(e: any) {
      console.log("aaaaaaaaaa", Object.keys(ch.ColorList).length );
      list[e.color].active = !e.active;
      ch.ColorActive(toRaw(list));
    }

    return { list, click };
  }
});
</script>

<style>
.hhl-chart-legend {
  grid-area: footer;
  display: flex;
  /* border: solid red 1px; */
  font-size: 12px;
  padding: 4px;
  justify-content: center;
}

.hhl-chart-legend-box {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.hhl-chart-legend-box + .hhl-chart-legend-box {
  margin-left: 10px;
}

.hhl-chart-legend-color {
  width: 12px;
  height: 12px;
  margin-right: 4px;
}

.hhl-chart-legend-box[active="false"] {
  opacity: 0.2;
}
</style>
