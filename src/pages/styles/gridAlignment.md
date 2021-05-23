## Align and Justify GRID

There are 3 main categories for placement.
- __Content:__ This is how the group of cells are placed in the main container.
- __Items:__ This is how each items is placed in each cell.
- __Self:__ This is how single item is paced in a cell. 

For each category the are 2 axis.
- __Align:__ This is how the item is placed in the row axis (up-down).
- __Justify:__ This is how the item is placed in the column axis (left-right).

So we end up with 6 CSS properties.
- __align-content__
- __justfy-content__
- __align-items__
- __justify-item__
- __align-self__
- __justify-self__


### Align Content
__CSS Class: `alignContent-start/center/end/between/around/evenly/stretch`__ <br/> 
__Component: `align-content="start/center/end/space-between/space-around/space-evenly/stretch"`__ <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="alignContentList" label="Align Content"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto" :align-content="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
      const alignContentList = ref([
                    " ", "start", "center", "end", "space-between", "space-around", "space-evenly", "stretch"
                    ]);
    return {
    val,
    alignContentList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Justify Content
__CSS Class: `justContent-start/center/end/between/around/evenly/stretch`__ <br/> 
__Component: `justify-content="start/center/end/space-between/space-around/space-evenly/stretch"`__ <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="justifyContentList" label="Justify Content"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto" :justify-content="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
      const justifyContentList = ref([
                    " ", "start", "center", "end", "space-between", "space-around", "space-evenly", "stretch"
                    ]);
    return {
    val,
    justifyContentList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Align Items
__CSS Class: `alignItems-start/center/end/stretch`__ <br/> 
__Component: `align-items="start/center/end/stretch"`__ <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 m-4 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="alignItemsList" label="Align items"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto" :align-items="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
      const alignItemsList = ref([
                    " ", "start", "center", "end", "stretch"
                    ]);
    return {
    val,
    alignItemsList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Justify Items
__CSS Class: `justItems-start/center/end/stretch`__ <br/> 
__Component: `justify-items="start/center/end/stretch"`__ <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 m-4 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="justItemsList" label="Justify items"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto" :justify-items="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
      const justItemsList = ref([
                    " ", "start", "center", "end", "stretch"
                    ]);
    return {
    val,
    justItemsList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Align Self
__CSS Class: `alignSelf-start/center/end/stretch`__ <br/>

The default is stretch.<br/>
The selected `alignSelf` class is bound to box 2.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 m-4 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="alignSelfList" label="Align self"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto">
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
      const alignSelfList = ref([
                    " ", "alignSelf-start", "alignSelf-center", "alignSelf-end", "alignSelf-stretch"
                    ]);
    return {
    val,
    alignSelfList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

### Justify Self
__CSS Class: `justSelf-start/center/end/stretch`__ <br/> 
The default is stretch.<br/>
The selected `justSelf` class is bound to box 2.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class="flx-row flx-align-center flx-wrap mb-15 gap-6 m-4 p-15 shadow-1">
        <hhl-select v-model="val" :select-data="justSelfList" label="Justify self"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto">
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const val = ref(" ");
        const justSelfList = ref([
                    " ", "justSelf-start", "justSelf-center", "justSelf-end", "justSelf-stretch"
                    ]);
    return {
    val,
    justSelfList
    }
    </script>
    <xstyle>
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br>

## Align & Justify Sandbox
The align & justfy self is bouend to box 2.
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="p-6">
      <div class= "flex-selectors flx-row flx-wrap flx-align-center flx-wrap mb-15 gap-6 m-4 p-15 shadow-1">
        <hhl-select v-model="alignContentVal" :select-data="justList" label="Align-content"></hhl-select>
        <hhl-select v-model="justContentVal" :select-data="justList" label="Justify-content"></hhl-select>
        <hhl-select v-model="alignItemVal" :select-data="itemList" label="Align-items"></hhl-select>
        <hhl-select v-model="justItemVal" :select-data="itemList" label="Justify-items"></hhl-select>
        <hhl-select v-model="alignSelfVal" :select-data="alignSelfList" label="Align self"></hhl-select>
        <hhl-select v-model="justSelfVal" :select-data="justSelfList" label="Justify self"></hhl-select>
      </div>
      <hhl-layout grid-lines row="auto" col="auto auto auto" col="auto auto auto" 
                    :align-content="alignContentVal"
                    :justify-content="justContentVal"
                    :align-items="alignItemVal"
                    :justify-items="justItemVal">
        <div>1</div>
        <div :class="selfClass">2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </hhl-layout>
    </div>
    </template>
    <script>
      const alignContentVal = ref("");
      const justContentVal = ref("");
      const alignItemVal = ref("");
      const justItemVal = ref("");
      const alignSelfVal = ref("");
      const justSelfVal = ref("");
      const itemList = ref([
                    "", "start", "center", "end", "stretch"
                    ]);
      const justList = ref([
                    "", "start", "center", "end", "space-between", "space-around", "space-evenly", "stretch"
                    ]);
      const alignSelfList = ref([
                    "", "alignSelf-start", "alignSelf-center", "alignSelf-end", "alignSelf-stretch"
                    ]);
      const justSelfList = ref([
                    "", "justSelf-start", "justSelf-center", "justSelf-end", "justSelf-stretch"
                    ]);
      const selfClass = computed(() => {
          return `${alignSelfVal.value} ${justSelfVal.value}`
        });
    return {
    alignContentVal,
    justContentVal,
    alignItemVal,
    justItemVal,
    alignSelfVal,
    justSelfVal,
    itemList,
    justList,
    alignSelfList,
    justSelfList,
    selfClass
    }
    </script>
    <xstyle>
      .flex-selectors > .hhl-select {
        min-width: 140px;
      }
      .gridBox {
        padding: 15px;
        height: 150px;
        box-shadow: var(--shadow-1);
      }
      .gridBox > div {
        min-height: 25px;
        min-width: 25px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    <x/style>
'>
</hhl-live-editor>
