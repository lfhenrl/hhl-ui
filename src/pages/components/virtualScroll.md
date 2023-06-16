# Virtual scroll

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <H_col align="center">
    <H_btn @click="load">Load</H_btn>
    <H_col>
      <H_virtual-list data-key="id" :data-sources="list" class="list">
        <template v-slot:header>
          <div>Headline..</div>
        </template>
        <template v-slot="data">
          <div class="item col-pri shadow-2">
            <span>Id: {{ data.item.id }}</span>
            <span>Row: {{ data.item.val1 }}</span>
            <span>Group: {{ data.item.val2 }}</span>
            <span>Val3: {{ data.item.val3 }}</span>
            <span>Val4: {{ data.item.val4 }}</span>
          </div>
        </template>
      </H_virtual-list>
    </H_col>
    </H_col>
    </template>
    <script>
    // import { getData } from "dataSource";
    const { getData } = fakeImport;
    const list = ref([]);
    function load() {
      const d = getData(1000);
      console.log(d)
      list.value = d;
    }
    return {list, load}
    </script>
    <style>
    .list {
      max-height: 400px;
      border: solid 1px var(--col-bg-3);
      overflow: auto;
    }      
    .item {
      display:flex;
      border: solid 1px var(--col-bg-3);
      gap: 10px;
      flex-wrap:wrap;
      padding: 10px;
      margin: 7px;
    }
    </style>
'>
</hhl-live-editor>

<br>
