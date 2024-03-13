# DataGrid

The H_datagrid component is a datagrid for displaying data in a tabular format,
with range of functionalities.<br>
It use a virtual scoller so it can handle big dataset.
<br>
<br>

<hhl-live-editor title="" htmlCode='
<template>
    <div style="height: 400px;">
        <H_datagrid
              :data-handler="lData"
              data-key="id"                 
        >
            <H_column field="id" type="number"></H_column>
            <H_column field="val1" type="string"></H_column>
            <H_column field="val2" type="string"></H_column>
            <H_column field="val3" type="string"></H_column>
            <H_column field="val4" type="string"></H_column>
            <H_column field="val5" type="bool"></H_column>
            <H_column field="val6" type="date"></H_column>
            <H_column field="val7" type="string"></H_column>
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

## Datagrid properties.

| Name       | Describtion                                                                       |
| ---------- | --------------------------------------------------------------------------------- | 
| dataKey | Required. A data key from the datasource that should be unik. | 
| dataHandler | Required. A data function you need to import from the libery. |
|row_height| The height of the row the default is 33px.|
| row_style | A function to be called if you want to style the row, you will recieve the rowData so you can use this as conditions |
| filterList | A string array with the field names you want to filter by with a global filter |
| filterstring | The filter string to use with the global filter|
| groupList | A string array with the field names you want to group by max 3 fields |


<br/>

## Datagrid events.

| Name         | Describtion                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| head-click | A event for a column is clicked, the event sends information about column and other details                                                    |
|row-click  | A event a row is clicked, the event sends information about column and the row.                                                       |

<br/>

## Datagrid slots.

| Name       | Describtion                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------- |
| default | Here you have to put the columns |
| head  | A possibillity to add content on top of the grid. It could be the global filter interface             |



<br/>

## Column properties

| Name    | Describtion                                                                               |
| ------- | ----------------------------------------------------------------------------------------- |
| field | Required. The field from the datasource                                                          |
| type    | Required. The type of data |
| title    | If you want another Title than the field name |
| width    | The width of the column default "auto", so it will adjust to content |
| autoWidth    | by default the width of the column will be auto adjusted if you click <hicon icon="expand_horizontal" style="margin-bottom: -7px;"/> icon in the bottom toolbar you can prevent this by adding auto-width="false"|
| autoHeight    | If you have set the row_height on the datagrid to have space for more lines in a row cell, you can set auto-width=true if you want the text split to more lines  |
| visibel    | If you want to hide the column up front, it can controlled later by the column menu |
| cell_class    | To add a class to a cell in the datagrid |
| cell_style    |  A function to be called,the event sends data for the value and row should return a style object|
| format    | A function to be called,the event sends data for the value and row, should return the formattet value |
| sorting    | The column get a sorting by default but you can disable this by sorting="none" <br> If you want sorting up front you can set sorting="asc/desc" |
| sortIndex    | If you make sorting up front with more columns you can specify the order by this |
| filter    | The column get a filter by default but you can disable this by filter="none" or if you want the filter to be a select filter by filter="select" |
| filter_condition1    | The condition 1 should be contain/startswith etc. For filtering up front. |
| filter_condition2    | The condition 2 should be contain/startswith etc. For filtering up front. |
| filter_value1    | The value 1 to filter by. For filtering up front. |
| filter_value2    | The value 2 to filter by. For filtering up front. |
| filter_logical    | The 2 filters will be handled by this, can be “and” (default) or “or” |
| select_list    | select filters will be automatic filled with data from the datasource. But if you need you can add you own list.|

<br/>

## Datasource.

The datasource is handled by a datahandler called localdata it is also possible to get a virsion called servedata.<br>
First think to do is to provide a unik key for the data-set by the property `data-key`<br>
The localdata recieve the data by first call `localdata.startLoading()` for the loading bar showing we wait for data.<br>
Next set the data with `localdata.setData(data)` and call `localdata.loadData()` to fill the datagrid with the data.<br>
<br>

  ## Column resize
  You can resize the column width dragging the border.<br>
  In the dropDown menu you can select `Auto size` that will adjust the size to the content.<br>
  You can auto adjust all columns by clicking the <hicon icon="expand_horizontal" style="margin-bottom: -7px;"/> icon in the bottom toolbar.<br>
  You can prevent this by adding auto-width="false"
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
<br>

## Cell class
You can add a class to a cell in the datagrid by the property `cell_class`.
<br>
<br>

## Cell style
You can add a function to the property `cell_style` that will be called with the value and the row.<br>
It shall return a style object.<br>
```js

  <H_column
    field="val3"
    title="Value 3"
    type="string"
    :cell_style="styleCell"
  />

  function styleCell(val: string, row: any) {
    if (val === "Row 4 cell 3." || row.id === 2)
      return {
        color: "red",
      };
  }

```
<br>
<br>

## Cell format
You can add a function to the property `format` that will be called with the value and the row.<br>
It shall return a value.<br>
```js

   <H_column 
    field="val6" 
    title="Value 6" 
    type="date" 
    :format="formatDate" />

  function formatDate(value: any, row: any) {
    return D_01_dec_2021_HHMM(value);
  }

```
<br>
<br>

## Cell template
In the default slot for a column you can add your own content.<br>
The slot will be Scoped with a data object with the these data.<br>
data.value: The value of the cell.<br>
data.row: the rowdata for the actual row.<br>
data.col: with all the data for the actual column,



```js

  <H_column field="id" title="Id" type="number">
    <template #default="data">id:{{ data.value }}</template>
  </H_column>

```
<br>
<br>

## Row style
You can add a function to the property `row_style` that will be called with the row data.<br>
It shall return a style object.<br>
```js

  <H_datagrid
    :dataHandler="lData"
    :filter-list="['id', 'val1', 'val2', 'val3', 'val4', 'val7']"
    :filterstring="seek"
    :row_style="rowStyle"
    data-key="id"
  >

  function rowStyle(row: any) {
    if (row.id === 7)
      return {
        color: "red",
      };
  }

```
<br>
<br>

## Header click
To reduce the amount of eventhandlers, there is one event for that something in the header is clicked<br>
The event `head-click` will give these informatios.<br>


```js


    colIndex: 1       The index of the column.
    colOrgIndex: 1    The originel index of the column
    column:Column     All the data for the actual column
    dataId:null       Not relevant for a header
    dataItem:null     Not relevant for a header
    field: "id"       The field name.
    subType: "title"  Gives info on what is clicked could be 
                      title/resize/menuSortAsc/menuSortDesc/menuFilter/menuAutoSize
    type: "headcell"  The type of dom element


```

So if you want to do something when you click on the title on the column withe index 0 (The first column)<br>
```js

    <H_datagrid
      @head-click="headClick"
      :dataHandler="lData"
      data-key="id"
    >

    function headClick(data: iClickData) {
      // use colOrgIndex because the column maybe have been reorded
      if (data.colOrgIndex === 0 && data.subType === "title") {
        console.log("headClick :", data);
      }
    }
```

<br>
<br>


## Row click
To reduce the amount of eventhandlers, there is one event for that row is clicked<br>
The event `row-click` will give these informatios.<br>


```js


    colIndex: 1       The index of the column.
    colOrgIndex: 1    The originel index of the column.
    column:Column     All the data for the actual column.
    dataId: 1         The data Id of the row.
    dataItem: {}      The data for the row.
    field: "id"       The field name.
    subType: "XX1"    Gives info on what is clicked if you have added data-subtype="XX1" on something in a cell template
    type: "rowcell"   The type of dom element


```

So if you want to do something when you click on button in a cell template.<br>
```js

    <H_datagrid
      @row-click="rowClick"
      :dataHandler="lData"
      data-key="id"
    >

    <H_column field="id" title="Id" type="action">
      <template #default="data">
        <H_btn size="xs" data-subtype="XX1">{{ data.value }}</H_btn>
      </template>
    </H_column>

    function rowClick(data: iClickData) {
      if (data.subType === "XX1") {
        console.log("rowClick: ", data);
      }
    }

```

<br>
<br>

## Sorting
  You can sorting by the dropdown menu for a column. <br>
  If you not want sorting for a column you can add `sorting="none"`.<br>
  If you want sorting up front you can on the column add `sorting="asc"` oe `sorting="desc"`<br>
  If you want to sort by more than one column you can add `sort-index="1/2/3"`
  <br>

  ## Filter
  The filter will be added automatically by the columns type property.<br>
  You can filter by the dropdown menu for a column.<br>
  there are 6 filters.<br>
  ## String Filter
  Filter for strings with these conditions. <br>
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

  Filter for numbers with these conditions. <br>
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

  Filter for dates with these conditions.<br>
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

 Filter for boolean with these conditions. <br>
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
The select filter will not be added automatically you need to specify `filter="select"` for the column.<br>
  Select filter with these conditions. <br>
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

## Global Filter
You can add a global filter by adding a search textbox.<br>
You bind the textbox with its `V-model` with a ref and add this ref to the Datagrid property `filterstring`<br>
In the property `filter-list` you should add an string array with the fields you want to search.

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



## Example Grouping.
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
              :group-list="[`val2`,`val4`]"
              data-key="id"                 
        >
          <H_column field="val2" title="Value 2" type="string" filter_type="select"></H_column>
          <H_column field="val4" title="Value 4" type="string" filter_type="select"></H_column>
            <H_column field="id" title="Id" type="number" filter_type="number" cell-class="text-err" width="100px"></H_column>
            <H_column field="val1" title="Value 1" type="string" filter_type="string" width="auto"></H_column>          
            <H_column field="val3" title="Value 3" type="string" filter_type="string" ></H_column>            
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
          const data = await getData(1000);
          lData.setData(data);
          lData.loadData();
    }
    return { seek, lData, load }
</script>
'>
</hhl-live-editor>
<br>