<template>
  <div
    class="hhl-chart-yscale-band"
    :style="{
      paddingTop: marginTop + 'px',
      paddingLeft: marginLeft + 'px',
      paddingRight: marginRight + 'px',
      paddingBottom: marginBottom + 'px',
      minHeight: height + 'px'
    }"
  >
    <div
      class="hhl-chart-yscale-band-item"
      v-for="(item, index) in list"
      :key="index"
      :style="{ height: itemHeight + 'px', marginBottom: index + 1 >= listLenght ? '0' : innerMargin + 'px' }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import { iHHLchart } from "./use/hhlChart";

export default defineComponent({
  name: "hhl-chart-yscale-band",
  props: {
    itemHeight: { type: Number, default: 70 },
    marginTop: { type: Number, default: 50 },
    innerMargin: { type: Number, default: 20 },
    marginLeft: { type: Number, default: 5 },
    marginRight: { type: Number, default: 5 },
    marginBottom: { type: Number, default: 5 },
    bandNames: { type: Array, default: ["Batch", "State", "larsen"] },
    bandTitles: { type: Array, default: ["Batch", "State", "larsen"] }
  },
  setup(props) {
    const ch = inject("ch") as iHHLchart;
    const list = ref(<any>{});
    const listLenght = computed(() => props.bandNames.length);
    const BandList = {};

    props.bandNames.forEach((item, index) => {
      const _item = (item as string) || "";
      if (index === 0) {
        BandList[_item] = {
          name: _item,
          title: props.bandTitles[index] || _item,
          pos: props.marginTop
        };
      } else {
        BandList[_item] = {
          name: _item,
          title: props.bandTitles[index] || _item,
          pos: props.marginTop + (props.itemHeight + props.innerMargin) * index
        };
      }
    });
    ch.Y.bands.size = props.itemHeight;
    ch.Y.bands.list = BandList;
    list.value = BandList;

    const height = computed(() => {
      return props.marginTop + props.marginBottom + 20 + (props.itemHeight + props.innerMargin) * props.bandNames.length;
    });

    return { list, height, listLenght };
  }
});
</script>

<style>
.hhl-chart-yscale-band {
  grid-area: left-scale;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  /* border-right: 1px solid gray; */
}

.hhl-chart-yscale-band-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
