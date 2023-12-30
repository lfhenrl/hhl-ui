# Pie Chart

## Data

The `"data"` property need a Array like this.

```js
[
  { name: "Name1", value: 25, color: "lime" },
  { name: "Name2", value: 25, color: "red" },
  { name: "Name3", value: 25, color: "orange" },
  { name: "Name", value: 25, color: "blue" },
];
```

Where the total of values gives 100 (%) <br />
<br />

<hhl-live-editor title="Data" htmlCode='
  <template>
    <div class="flexRow items-center gap-4 flexWrap" >
    <div>
        <H_chart-pie :data="list" size="200px"/>
    </div>
    <H_btn @click="load">Load new data</H_btn>
    </div>
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
      <div class="flexCol gap-8 flexWrap">
        <div>
          <H_chart-pie :data="list" 
            :hide-legend="hideLegend" 
            :legend-placement="placeMent" 
            :legend-stacked="legendStacked"/>
        </div>
       <div class="flexRow items-center gap-4 flexWrap">
          <H_checkbox v-model="hideLegend" label="Hide legend."></H_checkbox>
          <H_checkbox v-model="legendStacked" label="legend-stacked."></H_checkbox>
          <H_select v-model="placeMent" label="placment" :list="placements"></H_select>
        </div>
      </div>
    </template>
    <script>
      const hideLegend = ref(false);
      const legendStacked = ref(true);
      const placements = ref([`bottom`, `top`,`right`,`left`]);
      const placeMent = ref(`bottom`);
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
       <div class="flexRow items-center gap-8 flexWrap">
        <div>
          <H_chart-pie :data="list" :font-size="fontSize" :pie-width="Number(pWidth)" legend-placement="bottom" />
        </div>
         <div class="flexRow items-center gap-4 flexWrap">
          <H_inputNumber v-model="pWidth" label="Pie width." max="64" min="2"></H_inputNumber>
          <H_inputNumber v-model="fSize" label="Font size. (px)" max="30" min="4"></H_inputNumber>
        </div>
      </div>
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
