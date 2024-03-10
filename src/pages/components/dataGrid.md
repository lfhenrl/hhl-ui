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

## Sorting
  You can sorting by the dropdown menu for a column. <br>
  If you not want sorting for a column you can add `sorting="none"` see column for Val4.
  <br>

  ## Column resize
  You can resize the column width dragging the border.<br>
  In the dropDown menu you can select `Auto size` that will adjust the size to the content.<br>
  You can auto adjust all columns by clicking the <hicon icon="expand_horizontal" style="margin-bottom: -7px;"/> icon in the bottom toolbar.
<br>
  <br>

  ## Filter
  You can filter by the dropdown menu for a column by adding filter type to each column.<br>
  there are 6 filters.<br>
  ## String Filter
  `filter_type="string"`: Gives a filter for strings with these conditions. <br>
        | "none"
        | "equal"
        | "notEqual"
        | "contain"
        | "notContain"
        | "startswith"
        | "notStartwith"
        | "endwith"
        | "notEndwith"
   <br>
You can add 2 conditions with an "and" or "or".
   <br>
You can add the filters as properties to the column.
<br>
`filter_condition1`: The condition 1 should be contain/startswith etc.<br>
`filter_value1`: The value 1 to filter by<br>
`filter_logical`: The 2 filters will be handled by this, can be "and" (default) or "or"<br>
`filter_condition2`:The condition 2 should be contain/startswith etc.<br>
`filter_value2`: The value 2 to filter by<br>
for example: <br>
`filter_condition1="contain" filter_value1="5" filter_logical="or" filter_condition2="contain" filter_value2="7"`
  <br>
  Will get all rows that contains 5 and 7.
<br>
<br>
 ## Number Filter

  `filter_type="number"`: Gives a filter for numbers with these conditions. <br>
        | "none"
        | "equal"
        | "notEqual"
        | "greater"
        | "greaterOrEqual"
        | "less"
        | "lessOrEqual"

   <br>
You can add 2 conditions with an "and" or "or".
   <br>
You can add the filters as properties to the column.
<br>

`filter_condition1`: The condition 1 should be equal/greater etc.<br>
`filter_value1`: The value 1 to filter by<br>
`filter_logical`: The 2 filters will be handled by this, can be "and" (default) or "or"<br>
`filter_condition2`:The condition 2 should be equal/greater etc.<br>
`filter_value2`: The value 2 to filter by<br>
for example: <br>
`filter_condition1="greater" filter_value1="5" filter_logical="and" filter_condition2="less" filter_value2="77"`
  <br>
  Will get all rows that that are greater than 5 and less than 77.
<br>
<br>
 ## DateTime Filter

  `filter_type="date"` or `filter_type="datetime"`: Gives a filter for dates with these conditions.<br>
        | "none"
        | "equal"
        | "notEqual"
        | "greater"
        | "greaterOrEqual"
        | "less"
        | "lessOrEqual"
   <br>
You can add 2 conditions with an "and" or "or".
   <br>
You can add the filters as properties to the column.
<br>

`filter_condition1`: The condition 1 should be equal/greater etc.<br>
`filter_value1`: The value 1 to filter by, in this format YYYY-MM-DDTHH:mm:ss or YYYY-MM-DD<br>
`filter_logical`: The 2 filters will be handled by this, can be "and" (default) or "or"<br>
`filter_condition2`:The condition 2 should be equal/greater etc.<br>
`filter_value2`: The value 2 to filter by,in this format YYYY-MM-DDTHH:mm:ss or YYYY-MM-DD<br>
for example: <br>
`filter_condition1="greater" filter_value1="2022-01-02" filter_logical="and" filter_condition2="less" filter_value2="2022-01-12"`
  <br>
  Will get all rows that that are greater than 3 Jan 2022 and less than 12 Jan 2022.
<br>
<br>

## Boolean Filter

 `filter_type="bool"`: Gives a filter for boolean with these conditions. <br>
      | "none"
      | "equal"
<br>
You can add the filters as properties to the column.
<br>

`filter_condition1`: The condition 1 should be equal.<br>
`filter_value1`: The value 1 to filter by true,false,null<br>
<br>
for example: <br>
`filter_condition1="equal" filter_value1="false,null"`
  <br>
  Will get all rows that that have a value of false or null.
<br>
<br>

## Select Filter
  `filter_type="select"`: Gives a select filter with these conditions. <br>
      | "none"
      | "equal"
      | "notEqual"
<br>
You can add the filters as properties to the column.
<br>

`filter_condition1`: The condition 1 should be equal/notEqual.<br>
`filter_value1`: The value 1 to filter by as a comma separated string<br>
for example: <br>
`filter_condition1="notEqual" filter_value1="Group 2.,Group 5."`
  <br>
  Will get all rows that that not have a value of Group 2. or Group 5.
<br>
<br>
The select list will be automatic filled with data from the datasource.<br>
You can add the list with other data by adding a String Array to property `select_list="list"`<br>
If you want the list show Labels that not correspond to the values you want to filter by<br>you can make a list of objects with this syntax {value: string, label: string}
<br>
<br>
## Grouping
You can group your data to max 3 levels.<br>
Up front you can set the grouping by the property `group-list` with a string array order by the levels.<br>
In the columns menu you get by cliking the <hicon icon="columns" style="margin-bottom: -7px;"/> icon in the bottom toolbar.<br>
You can drag columns to or from the column list to the group list.<br>
you can drag the column up and down to adjust the order the data will be grouped.
<br>
<br>
## Column Toggle
In the columns menu you get by cliking the <hicon icon="columns" style="margin-bottom: -7px;"/> icon in the bottom toolbar.<br>
You can toggle the columns on or off by the checkbox.
<br>
<br>
## Column Reorder
In the columns menu you get by cliking the <hicon icon="columns" style="margin-bottom: -7px;"/> icon in the bottom toolbar.<br>
you can drag the column up and down to adjust the order of the columns.
<br>
<br>

## Export to Excel
In the columns menu you get by cliking the <hicon icon="excel" style="margin-bottom: -7px;"/> icon in the bottom toolbar.<br>
you can drag the column up and down to adjust the order of the columns.
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
            <H_column sorting="none" field="val4" title="Value 4" type="string" filter_type="select"></H_column>
            <H_column field="val5" title="Value 5" type="bool" filter_type="bool" ></H_column>
            <H_column field="val6" title="Value 6" type="date" filter_type="datetime" :format="formatDate" ></H_column>
      </H_datagrid>
    </div>
  </div>
</template>
<script>
    // import { localData } from "HHL-UI/Components/datagrid";            
    const { localData, getData, dateFormat } = fakeImport;
    const lData = new localData();
    async function load() {
      await lData.startLoading();
          const data = await getData(100);
          lData.setData(data);
          lData.loadData();
    }
    function formatDate(value) {
        return dateFormat.D_01_dec_2021_HHMM(value);
    }
    onMounted(() => {
        setTimeout(()=>{
        load();
        },1000);       
    });
    return { lData,formatDate }
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
