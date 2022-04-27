# Pie Chart

## Data

The `"data"` property need a Array like this.

```js
[
  { name: "Name1", value: 25, color: "lime" },
  { name: "Name2", value: 25, color: "red" },
  { name: "Name3", value: 25, color: "orange" },
  { name: "Name", value: 25, color: "blue" }
];
```

Where the total of values gives 100 (%) <br />
<br />

<hhl-live-editor title="Data" htmlCode='
  <template>
    <H_flex>
    <div class="relative w-50">
        <H_chart-pie :data="list"/>
    </div>
    <H_btn @click="load">Load new data</H_btn>
    </H_flex>
    </template>
    <script>
      const list = ref([
        { name: "Name1", value: 25, color: "lime" },
        { name: "Name2", value: 25, color: "red" },
        { name: "Name3", value: 25, color: "orange" },
        { name: "Name", value: 25, color: "blue" }
      ]);
      function load() {
        const rand = Math.floor(Math.random() * 70);
        const restDivede6 = (100-rand)/6;
        list.value = [
        { name: "Name1", value: rand, color: "lime" },
        { name: "Name2", value: restDivede6, color: "red" },
        { name: "Name3", value: restDivede6 * 3, color: "orange" },
        { name: "Name", value: restDivede6 * 2, color: "blue" }
      ];
      }
      return {list, load}
    </script>
'>
</hhl-live-editor>
<br />

## Legend

By the `"hide-legend"` property the legend will not visibel.<br />
By the `"legend-stacked"` property you choose if you want the items to be stacked or not. If not stacket it will adjust to available space (flex-wrap). Default is stacked<br />
By the `"legend-placement"="bottom/center/top/right/left"` property you chose the placement. Default is center<br />
<br />

<hhl-live-editor title="Legend" htmlCode='
    <template>
      <H_flex>
        <div>
          <H_chart-pie :data="list" 
            :hide-legend="hideLegend" 
            :legend-placement="placeMent" 
            :legend-stacked="legendStacked"/>
        </div>
        <H_flex flx_direction="column" flx_padding="0 60px" flx_align="start" flx_gap="20px">
          <H_checkbox v-model="hideLegend" label="Hide legend."></H_checkbox>
          <H_checkbox v-model="legendStacked" label="legend-stacked."></H_checkbox>
          <H_select v-model="placeMent" label="placment" :select-data="placements"></H_select>
        </H_flex>
      </H_flex>
    </template>
    <script>
      const hideLegend = ref(false);
      const legendStacked = ref(true);
      const placements = ref([`bottom`,`center`,`top`,`right`,`left`]);
      const placeMent = ref(`center`);
      const list = ref([
        { name: "Name1", value: 25, color: "lime" },
        { name: "Name2", value: 25, color: "red" },
        { name: "Name3", value: 25, color: "orange" },
        { name: "Name", value: 25, color: "blue" }
      ]);
      return {list, hideLegend, legendStacked, placements, placeMent}
    </script>
'>
</hhl-live-editor>
<br />

## Size

The Chart-pie will adjust to its parent container.<br />
By the `"pie-width"`= `"2-64"` property you adjust the widt of the pie. Default is 20<br />
By the `"font-size"`=`"px/em/rem etc"` property you chose the font size of the legend items. Default is `"var(--comp-font-size)"`<br />
<br />

<hhl-live-editor title="Size" htmlCode='
    <template>
      <H_flex >
        <div class="relative w-50">
          <H_chart-pie :data="list" :font-size="fontSize" :pie-width="Number(pWidth)" legend-placement="bottom" />
        </div>
        <H_flex flx_direction="column" flx_padding="0 60px" flx_align="start">
          <H_input type="number" v-model="pWidth" label="Pie width." max="64" min="2"></H_input>
          <H_input type="number" v-model="fSize" label="Font size. (px)" max="30" min="4"></H_input>
        </H_flex>
      </H_flex>
    </template>
    <script>
      const pWidth = ref(20);
      const fSize = ref(10);
      const fontSize = computed(() => fSize.value + `px`)
      const list = ref([
        { name: "Name1", value: 25, color: "lime" },
        { name: "Name2", value: 25, color: "red" },
        { name: "Name3", value: 25, color: "orange" },
        { name: "Name", value: 25, color: "blue" }
      ]);
      return {list, pWidth,fSize, fontSize}
    </script>
'>
</hhl-live-editor>
<br />
