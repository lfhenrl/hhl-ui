# Virtual scroll

<style>
  .list {
    border: 1px solid var(--col-pri);
    max-height: 500px;
    gap:16px;
    overflow: auto;
  }
  .listItem {
    border: 1px solid var(--col-pri);
    border-radius: 4px;
    display:flex;
    gap:8px;
    margin: 3px 10px;
    width: 90%;
  }
</style>

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex  gap-4">
    <H_btn @click="load">Load</H_btn>
     <div class="flex flex-col  gap-4">
      <H_virtual-list data-key="id" :data-sources="list" class="list shadow">
        <template v-slot:header>
          <div>Headline..</div>
        </template>
        <template v-slot="data">
          <div class="listItem shadow">
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
      const d = getData(40000);
      list.value = d;
    }
    return {list, load}
    </script>
'>
</hhl-live-editor>

<br>
