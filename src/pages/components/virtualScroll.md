# Virtual scroll

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
        <div h-display="flex" h-gap="1rem" h-width="100%">
        <H_btn @click="load">Load</H_btn>
        <div h-display="flex" h-flex-direction="column" h-gap="1rem" h-width="100%">
        <H_virtual-list data-key="id" :data-sources="list" h-shadow="md" h-overflow="auto" h-gap="2rem" h-border="1px solid var(--col-5)"h-max-height="24rem">
        <template v-slot:header>
        <div>Headline..</div>
        </template>
        <template v-slot="data">
        <div h-display="flex" h-gap="2rem" h-margin="0.5rem" h-width="100%" h-shadow="md" h-border="1px solid var(--col-9)" h-border-radius="4px">
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
