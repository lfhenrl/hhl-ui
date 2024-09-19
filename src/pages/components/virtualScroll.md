# Virtual scroll


## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex  gap-4 w-full">
    <H_btn @click="load">Load</H_btn>
     <div class="flex flex-col  gap-4 w-full">
      <H_virtual-list data-key="id" :data-sources="list" class="list border border-pri border-solid shadow max-h-96 gap-8 overflow-auto">
        <template v-slot:header>
          <div>Headline..</div>
        </template>
        <template v-slot="data">
          <div class="listItem shadow border-pri border-solid rounded flex gap-8 w-full m-1">
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
