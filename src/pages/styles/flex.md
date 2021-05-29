## Adding flex box.

By adding 1 of these classes to a dom container, you will get the flex box functionality.<br>

- `flx-row` - Flex direction row, from left to right as block.
- `flx-inline-row` - Flex direction row, from left to right as inline.
- `flx-col` - Flex direction column, from top to bottom as block.
- `flx-inline-row` - Flex direction row, from from top to bottom as inline.

<br>

## Flex direction.

<hhl-live-editor title="Flex direction" htmlCode='
    <template>
      <div class="flx-row flx-justify-evenly mb-25" >
        <div>FLEX ROW
          <div class="demo_row flx-row">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
        <div>FLEX COLUMN
          <div class="demo_column flx-col">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
    </template>
    <xstyle>
      .demo_row {
        border: 1px red solid;
        height: 150px;
        width: 150px;
      }
      .demo_column {
        border: 1px red solid;
        height: 170px;
        width: 170px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Flex Wrap

By adding the class `flx-wrap` the items will wrap if there not is space enough.

**CSS Class: `flx-wrap`**<br/>
<hhl-live-editor title="Flex wrap" htmlCode='
    <template>
    <div class="flx-row flx-justify-evenly mb-10" >
      <div>FLEX ROW
        <div class="demo_row flx-row flx-wrap">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div> 
      <div>FLEX COLUMN
        <div class="demo_column flx-col flx-wrap">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
    </template>
    <xstyle>
      .demo_row {
        border: 1px red solid;
        height: 150px;
        width: 150px;
      }
      .demo_column {
        border: 1px red solid;
        height: 170px;
        width: 170px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Gap

You can control the gap between rows and columns by the a CSS class `gap-{size}`.<br>
If you want only gaps between rows you use `gap-y-{size}`.<br>
If you want only gaps between columns you use `gap-x-{size}`.<br>

The __size__ controls the increment of the property:
- `0` - removes the spacing by setting it to __0__
- `1` - sets the spacing to __.25rem__
- `2` - sets the spacing to __.5rem__
- `3` - sets the spacing to __.75rem__
- `4` - sets the spacing to __1rem__
- `5` - sets the spacing to __1.25rem__
- `6` - sets the spacing to __1.5rem__
- `7` - sets the spacing to __1.75rem__
- `8` - sets the spacing to __2rem__
- `12` - sets the spacing to __3rem__
- `16` - sets the spacing to __4rem__


<hhl-live-editor title="Gap" htmlCode='
    <template>
    <div class="flx-row flx-justify-evenly flx-wrap overflow-auto flx-wrap-align-start mb-10" >
      <div>No Gap
        <div class="demo_box flx-row flx-wrap ">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div> 
      <div>gap-6
        <div class="demo_box flx-row flx-wrap gap-6">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
        <div>gap-y-6
        <div class="demo_box flx-row flx-wrap gap-y-6">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
        <div>gap-x-6
        <div class="demo_box flx-row flx-wrap gap-x-6">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </div>
    </template>
    <xstyle>
      .demo_box {
        border: 1px red solid;
        height: 150px;
        width: 150px;
      }
      .demo_box > div {
        min-height: 40px;
        min-width: 40px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Flex

The flex CSS property sets how a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis` if you look at the standard.<br>
By default flex items don't shrink below their minimum content size. To change this, set the item's min-width or min-height.<br><br>

By adding 1 of these classes to a dom container, you will get the flex functionality.<br>

- `flx-none` - Will create fully inflexible flex items. It is as if you wrote flex: 0 0 auto. The items cannot grow or shrink.
- `flx-initial` - Resets the item to the initial values of Flexbox. This is the same as flex: 0 1, so items will not grow larger than their flex-basis size
- `flx-1` - This is as if you used flex: 1 1 0. The items can grow and shrink from a flex-basis of 0.
- `flx-auto` - Is the same as using flex: 1 1 auto; everything is as with flex:initial but in this case the items can grow and fill the container as well as shrink if required..<br>

<hhl-live-editor title="Flex" htmlCode='
    <template>
    <div>
      flx-none
      <div class="flx-row gap-2" >
        <div class="p-2 flx-none">Short</div>
        <div class="p-2 flx-none">Medium length</div>
        <div class="p-2 flx-none">Significantly larger amount of content</div>
      </div>
        flx-initial
      <div class="flx-row gap-2" >
        <div class="p-2 flx-initial">Short</div>
        <div class="p-2 flx-initial">Medium length</div>
        <div class="p-2 flx-initial">Significantly larger amount of content</div>
      </div>
      flx-1
      <div class="flx-row gap-2" >
        <div class="p-2 flx-1">Short</div>
        <div class="p-2 flx-1">Medium length</div>
        <div class="p-2 flx-1">Significantly larger amount of content</div>
      </div>
      flx-auto
      <div class="flx-row gap-2" >
        <div class="p-2 flx-auto">Short</div>
        <div class="p-2 flx-auto">Medium length</div>
        <div class="p-2 flx-auto">Significantly larger amount of content</div>
      </div>
    </div>
    </template>
    <xstyle>
    div div div {
      background-color: var(--col-warn);
    }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Align and Justify FLEXBOX

**Properties that control alignment.**

- **justify-content** — controls alignment of all items on the main axis.
- **align-items** — controls alignment of all items on the cross axis.
- **align-self** — controls alignment of an individual flex item on the cross axis.
- **align-content** — controls space between flex lines on the cross axis, **only works when wrap is in use.**

**For easy use, there are these CSS classes.**

- `flx-justify-` with these paremeters `start/center/end/spaceBetween/spaceAround/spaceEvenly`.
- `flx-align-` with these paremeters `start/center/end/stretch`.
- `flx-self-align-` with these paremeters `start/center/end/stretch`.
- `flx-wrap-align-` with these paremeters `start/center/end/spaceBetween/spaceAround/spaceEvenly/stretch`.

### Justify Content (flx-justify)

**CSS Class: `flx-justify-start/center/end/space-between/space-around/space-evenly`** <br/>
The default is stretch
<hhl-live-editor title="Justify Content" htmlCode='
    <template>
    <div>
      <div class="flx-row flx-align-center flx-wrap mb-10 gap-6 m-4 p-15 shadow-2">
        <hhl-select 
          v-model="justifyContentVal" 
          :select-data="justifyContentList" 
          label="Select Justify Content">
        </hhl-select>
      </div>
      <div class="demo">
          <div>FLEX ROW
            <div class="demo_row flx-row flx-auto" :class="justifyContentVal">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div> 
          <div>FLEX COLUMN
            <div class="demo_column flx-col" :class="justifyContentVal">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
      const justifyContentVal = ref(" ");
      const justifyContentList = ref([
                    " ", 
                    "flx-justify-start", 
                    "flx-justify-center", 
                    "flx-justify-end", 
                    "flx-justify-between",
                    "flx-justify-around",
                    "flx-justify-evenly"
                    ]);
      return {
      justifyContentVal,
      justifyContentList
      }
    </script>
    <xstyle>
      .demo {
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
        }
      .demo_row {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_column {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        flex: 0 1 20px;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

### Align Items (flx-align)

**CSS Class: `flx-align-start/center/end/stretch`** <br/>
The default is stretch

<hhl-live-editor title="Align Items" htmlCode='
    <template>
      <div>
      <div class="flx-row flx-align-center flx-wrap mb-10 gap-6 m-4 p-15 shadow-2">
        <hhl-select v-model="alignItemsVal" :select-data="alignItemsList" label="Select Align Items"></hhl-select>
        </div>
        <div class="demo" >
          <div>FLEX ROW
            <div class="demo_row flx-row" :class="alignItemsVal">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div> 
          <div>FLEX COLUMN
            <div class="demo_column flx-col" :class="alignItemsVal">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
    const alignItemsVal = ref(" ");
    const alignItemsList = ref([
                    " ", 
                    "flx-align-start",  
                    "flx-align-center", 
                    "flx-align-end",
                    "flx-align-stretch"
                    ]);
    return {alignItemsVal, alignItemsList} 
    </script>
    <xstyle>
    .demo {
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      }
      .demo_row {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_column {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/><br/><br/>

### Align Self (flx-self-align)

**CSS Class: `flx-self-align-start/center/end/stretch`** <br/>
The default is stretch.<br>
The selected alignSelf class is bound to box 2.

<hhl-live-editor title="Align self" htmlCode='
    <template>
      <div>
      <div class="flx-row flx-align-center flx-wrap mb-10 gap-6 m-4 p-15 shadow-2">
        <hhl-select v-model="alignSelfVal" :select-data="alignSelfList" label="Select Align Self" class="my-4"></hhl-select>
        </div>
        <div class="demo" >
          <div>FLEX ROW
            <div class="demo_row flx-row">
              <div>1</div>
              <div :class="alignSelfVal">2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div> 
          <div>FLEX COLUMN
            <div class="demo_column flx-col">
              <div>1</div>
              <div :class="alignSelfVal">2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
    const alignSelfVal = ref(" ");
    const alignSelfList = ref([
                    " ", 
                    "flx-self-align-start",  
                    "flx-self-align-center", 
                    "flx-self-align-end",
                    "flx-self-align-stretch"
                    ])
    return {alignSelfVal, alignSelfList}
    </script>
    <xstyle>
    .demo {
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      }
      .demo_row {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_column {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/><br/><br/>

### Align Content (flx-wrap-align)

**CSS Class: `flx-wrap-align-start/center/end/space-between/space-around/space-evenly/stretch`** <br/>
The default is stretch

::: warning
This is only working when the flex container is set to flex-wrap `flx-wrap`.
:::

<hhl-live-editor title="Align content" htmlCode='
    <template>
      <div>
        <div class="flx-row flx-align-center flx-wrap mb-10 gap-6 m-4 p-15 shadow-2">
          <hhl-select v-model="alignContentVal" :select-data="alignContentList" label="Select Align Content"></hhl-select>
        </div>
        <div class="demo" >
            <div>FLEX ROW
              <div class="demo_row flx-row flx-wrap" :class="alignContentVal">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
          </div>
          </div> 
            <div>FLEX COLUMN
              <div class="demo_column flx-col flx-wrap" :class="alignContentVal">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
              </div>
            </div>
          </div>
        </div>
    </template>
    <script>
    const alignContentVal = ref(" ");
    const alignContentList = ref ([
                    " ", 
                    "flx-wrap-align-start", 
                    "flx-wrap-align-center", 
                    "flx-wrap-align-end", 
                    "flx-wrap-align-between",
                    "flx-wrap-align-around",
                    "flx-wrap-align-evenly",
                    "flx-wrap-align-stretch"
                    ]);
    return {alignContentVal, alignContentList}                
    </script>
    <xstyle>
    .demo {
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      }
      .demo_row {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_column {
        border: 1px red solid;
        height: 250px;
        width: 250px;
      }
      .demo_row > div, .demo_column > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/><br/> <br/>

## Align and Justify Sandbox.

<hhl-live-editor title="Flex playground" htmlCode='
    <template>
      <div >
        <div class="flex-selectors flx-row flx-align-center flx-wrap mb-10 gap-6 m-4 p-15 shadow-2">
          <hhl-checkbox v-model="flxWrapVal" label="Wrap & reduce size"></hhl-checkbox>
          <hhl-select v-model="alignContentVal" :select-data="alignContentList" label="Align Content (flx-wrap)"></hhl-select>
          <hhl-select v-model="justifyContentVal" :select-data="justifyContentList" label="Justify Content"></hhl-select>
          <hhl-select v-model="alignItemsVal" :select-data="alignItemsList" label="Align Items"></hhl-select>
          <hhl-select v-model="alignSelfVal" :select-data="alignSelfList" label="Align Self (Box 2)"></hhl-select>
        </div>
        <div class="demo" >
          <div>FLEX ROW
            <div class="demo_box flx-row" :class="val">
              <div>1</div>
              <div :class="alignSelfVal">2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div> 
          <div>FLEX COLUMN
            <div class="demo_box flx-col" :class="val">
              <div>1</div>
              <div :class="alignSelfVal">2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
    const flxWrapVal = ref(false);
    const alignContentVal = ref(" ");
    const justifyContentVal = ref(" ");
    const alignItemsVal = ref(" ");
    const alignSelfVal = ref(" ");
    const alignContentList = ref([
                    " ", 
                    "flx-wrap-align-start", 
                    "flx-wrap-align-center", 
                    "flx-wrap-align-end", 
                    "flx-wrap-align-between",
                    "flx-wrap-align-around",
                    "flx-wrap-align-evenly",
                    "flx-wrap-align-stretch"
                    ]);
    const justifyContentList = ref([
                    " ", 
                    "flx-justify-start", 
                    "flx-justify-center", 
                    "flx-justify-end", 
                    "flx-justify-between",
                    "flx-justify-around",
                    "flx-justify-evenly"
                    ]);
    const alignItemsList = ref([
                    " ", 
                    "flx-align-start",  
                    "flx-align-center", 
                    "flx-align-end",
                    "flx-align-stretch"
                    ]);
    const alignSelfList = ref([
                    " ", 
                    "flx-self-align-start",  
                    "flx-self-align-center", 
                    "flx-self-align-end",
                    "flx-self-align-stretch"
                    ]);
    const val = computed(() => {
          const wrap = flxWrapVal.value ? "flx-wrap reduceSize" : " ";
          return `${alignContentVal.value} ${justifyContentVal.value} ${alignItemsVal.value} ${wrap}`
        });
    return {
      flxWrapVal,
      alignContentVal,
      justifyContentVal,
      alignItemsVal,
      alignSelfVal,
      alignContentList,
      justifyContentList,
      alignItemsList,
      alignSelfList,
      val
    }
    </script>
    <xstyle>
    .demo {
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      }
      .flex-selectors > .hhl-select {
        min-width: 180px
      }
      .demo_box {
        border: 1px red solid;
        height: 300px;
        width: 300px;
      }
      .reduceSize {
        height: 200px;
        width: 200px;
      }
      .demo_box > div {
        min-height: 40px;
        min-width: 40px;
        margin: 4px;
        border: 1px solid lime;
        background-color: var(--col-pri);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<script setup>
  import hhlSelect from "../../components/forms/hhl-select.vue"
</script>