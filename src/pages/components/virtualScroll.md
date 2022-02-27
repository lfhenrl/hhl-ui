# Virtual scroll

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex flex-col gap-2 p-3 items-center">
    <H_btn @click="load">Load</H_btn>
    <div class="h-100 overflow-hidden">
      <H_virtual-list data-key="id" :data-sources="list" class="h-100 overflow-auto  border border-bg3">
        <template v-slot:header>
          <div class="d-row text-center font-extrabold">Headline..</div>
        </template>
        <template v-slot="data">
          <div class="flex flex-wrap gap-2 border border-bg3 m-1 p-2">
            <span>Id: {{ data.item.id }}</span>
            <span>Row: {{ data.item.val1 }}</span>
            <span>Group: {{ data.item.val2 }}</span>
            <span>Val3: {{ data.item.val3 }}</span>
            <span>Val4: {{ data.item.val4 }}</span>
          </div>
        </template>
                <template v-slot:footer>
          <div class="d-row text-center font-extrabold">Headline..</div>
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
'>
</hhl-live-editor>

<br>
