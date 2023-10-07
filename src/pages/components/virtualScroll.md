# Virtual scroll

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex flex-col items-center gap-4 px-4 ">
    <H_btn @click="load">Load</H_btn>
     <div class="flex flex-col items-center gap-4 px-4">
      <H_virtual-list data-key="id" :data-sources="list" class="border border-bg3 max-h-96 overflow-auto">
        <template v-slot:header>
          <div>Headline..</div>
        </template>
        <template v-slot="data">
          <div class="flex border border-bg3 gap-2 p-1 m-1 col-pri shadow-2">
            <span>Id: {{ data.item.id }}</span>
            <span>Row: {{ data.item.val1 }}</span>
            <span>Group: {{ data.item.val2 }}</span>
            <span>Val3: {{ data.item.val3 }}</span>
            <span>Val4: {{ data.item.val4 }}</span>
          </div>
        </template>
      </H_virtual-list>
    </div>
    </div>
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
