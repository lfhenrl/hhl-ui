# DataGrid

The H_datagrid component is a datagrid for displaying data in a tabular format,
with range of functionalities.
- Filtering
- Sorting
- Grouping
- Column Resizing
- Column Chooser
- Column Menu
- Cell Template
- Cell styling
- Cell format
- Row Styling
- Virtual scrolling
- Export to CSV
- Full screen

<br>

## Datasource.

The datasource is handled by a datahandler called localdata it is also possible to get a virsion called servedata.<br>
First think to do is to provide a unik key for the data-set by the property `data-key`<br>
The localdata recieve the data by first call `localdata.startLoading()` for the loading bar showing we wait for data.<br>
Next set the data with `localdata.setData(data)` and call `localdata.loadData()` to fill the datagrid with the data.<br>
<br>
You can resize the column width b
<br>

<hhl-live-editor title="" htmlCode='
<template>
    <div style="height: 400px;">
        <H_datagrid
              :data-handler="lData"
              data-key="id"                 
        >
            <H_column field="id" title="Id" type="number" filter_type="number" cell-class="text-err" width="100px"></H_column>
            <H_column field="val1" title="Value 1" type="string" filter_type="string" width="auto"></H_column>
            <H_column field="val2" title="Value 2" type="string" filter_type="select"></H_column>
            <H_column field="val3" title="Value 3" type="string" filter_type="string" ></H_column>
            <H_column field="val4" title="Value 4" type="string" filter_type="select"></H_column>
      </H_datagrid>
    </div>
  </div>
</template>
<script>
    // import { localData } from "HHL-UI/Components/datagrid";            
    const { localData, getData } = fakeImport;
    const lData = new localData();
    async function load() {
    await lData.startLoading();
          const data = await getData(100);
          lData.setData(data);
          lData.loadData();
    }
    onMounted(() => {
        setTimeout(()=>{
        load();
        },1000);       
    });
    return { lData }
</script>
'>
</hhl-live-editor>
<br>
<br>

## DatasourceXX.
<br>

<hhl-live-editor title="" htmlCode='
<template>
  <div style="display: flex;  flex-direction: column; gap:20px;">
    <div style="display: flex; align-items: center">
        <H_btn @click="load" style="width: 100px">Load</H_btn>
        <div style="flex: 1" ></div>
        <H_inputText v-model="seek" :debounce="300" clearable style="max-width: 200px">
            <template v-slot:end>
              <H_icon icon="search"></H_icon>
            </template>
        </H_inputText>
      </div>
    <div style="height: 400px;">
        <H_datagrid
              :data-handler="lData"
              :filter-list="[`id`, `val1`, `val2`, `val3`, `val4`, `val7`]"
              :filterstring="seek"
              data-key="id"                 
        >
            <H_column field="id" title="Id" type="number" filter_type="number" cell-class="text-err" width="100px"></H_column>
            <H_column field="val1" title="Value 1" type="string" filter_type="string" width="auto"></H_column>
            <H_column field="val2" title="Value 2" type="string" filter_type="select"></H_column>
            <H_column field="val3" title="Value 3" type="string" filter_type="string" ></H_column>
            <H_column field="val4" title="Value 4" type="string" filter_type="select"></H_column>
            <H_column field="val5" title="Value 5" type="bool" filter_type="bool"></H_column>
            <H_column field="val6" title="Value 6" type="date" filter_type="datetime"></H_column>
            <H_column field="val7" title="Value 7" type="string" filter_type="select"></H_column>
      </H_datagrid>
    </div>
  </div>
</template>
<script>
    // import { localData } from "HHL-UI/Components/datagrid";            
    const { localData, getData } = fakeImport;
    const lData = new localData();
    const seek = ref("");
    async function load() {
    await lData.startLoading();
          const data = await getData(100);
          lData.setData(data);
          lData.loadData();
    }
    return { seek, lData, load }
</script>
'>
</hhl-live-editor>
