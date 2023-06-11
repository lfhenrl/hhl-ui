## Align and Justify GRID

There are 3 main categories for placement.

- **Content:** This is how the group of cells are placed in the main container.
- **Items:** This is how each items is placed in each cell.
- **Self:** This is how single item is paced in a cell.

For each category the are 2 axis.

- **Align:** This is how the item is placed in the row axis (up-down).
- **Justify:** This is how the item is placed in the column axis (left-right).

So we end up with 6 CSS properties.

- **align-content** _(grid_al_content)_
- **justfy-content** _(grid_js_content)_
- **align-items** _(grid_al_items)_
- **justify-items** _(grid_js_items)_
- **align-self**
- **justify-self**

You also have the possibilliy to add padding _(grid_padding)_

## Align Content

Placement in the row axis (up-down) in the main container.

`grid_al_content="start/center/end/space-between/space-around/space-evenly/stretch"` <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="alignContentList" label="Align Content"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px" :grid_al_content="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("");
      const alignContentList = ref([
                    "", "start", "center", "end", "space-between", "space-around", "space-evenly", "stretch"
                    ]);
    return {
    val,
    alignContentList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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

## Justify Content

Placement in the column axis (left-right) in the main container.

`grid_js_content="start/center/end/space-between/space-around/space-evenly/stretch"` <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="justifyContentList" label="Justify Content"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px" :grid_js_content="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("");
      const justifyContentList = ref([
                    "", "start", "center", "end", "space-between", "space-around", "space-evenly", "stretch"
                    ]);
    return {
    val,
    justifyContentList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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

## Align Items

Placement in the row axis (up-down) in each cell.

`grid_al_items="start/center/end/stretch"`<br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="alignItemsList" label="Align items"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px" :grid_al_items="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_row>
    </template>
    <script>
      const val = ref("");
      const alignItemsList = ref([
                    "", "start", "center", "end", "stretch"
                    ]);
    return {
    val,
    alignItemsList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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

## Justify Items

Placement in the column axis (up-down) in each cell.

`grid_js_items="start/center/end/stretch"` <br>
The default is stretch.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="justItemsList" label="Justify items"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px" :grid_js_items="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("");
      const justItemsList = ref([
                    "", "start", "center", "end", "stretch"
                    ]);
    return {
    val,
    justItemsList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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

## padding

`grid_padding="px/em/% etc."` <br>
The default is 0.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_inputText v-model="val"  label="Padding"></H_inputText>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" :grid_padding="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("50px");
    return {
    val,
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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

## Align Self

**CSS Class: `alignSelf-start/alignSelf-center/alignSelf-end/alignSelf-stretch`** <br/>

The default is stretch.<br/>
The selected `alignSelf` class is bound to box 2.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="alignSelfList" label="Align self"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px">
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("");
      const alignSelfList = ref([
                    "", "alignSelf-start", "alignSelf-center", "alignSelf-end", "alignSelf-stretch"
                    ]);
    return {
    val,
    alignSelfList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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
<br>

## Align Self sizing

The system gives you the possibility to gives different values depending on the screen size. It contains 3 levels of media breakpoints that are used for targeting specific screen sizes

**CSS Class small: `alignSelf-start-sm/alignSelf-center-sm/alignSelf-end-sm/alignSelf-stretch-sm` > 400px** <br/>
**CSS Class medium: `alignSelf-start-md/alignSelf-center-md/alignSelf-end-md/alignSelf-stretch-md` > 700px** <br/>
**CSS Class large: `alignSelf-start-lg/alignSelf-center-lg/alignSelf-end-lg/alignSelf-stretch-lg` > 1100px** <br/>

<br>
<br>
<br>
<br>
<br>

## Justify Self

**CSS Class: `justSelf-start/justSelf-center/justSelf-end/justSelf-stretch`** <br/>
The default is stretch.<br/>
The selected `justSelf` class is bound to box 2.
<hhl-live-editor title="" htmlCode='
    <template>
      <H_row padding="0 0 20px 0">
        <H_select v-model="val" :list="justSelfList" label="Justify self"></H_select>
      </H_row>
      <H_grid grid-lines grid_row="auto" grid_col="auto auto auto" grid_padding="15px">
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </H_grid>
    </template>
    <script>
      const val = ref("");
        const justSelfList = ref([
                    "", "justSelf-start", "justSelf-center", "justSelf-end", "justSelf-stretch"
                    ]);
    return {
    val,
    justSelfList
    }
    </script>
    <xstyle>
      .H_grid {
        height: 200px;
        box-shadow: var(--shadow-2);
      }
      .H_grid > div {
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
<br>
<br>

## Justify Self sizing

The system gives you the possibility to gives different values depending on the screen size. It contains 3 levels of media breakpoints that are used for targeting specific screen sizes

**CSS Class small: `justSelf-start-sm/justSelf-center-sm/justSelf-end-sm/justSelf-stretch-sm` > 400px** <br/>
**CSS Class medium: `justSelf-start-md/justSelf-center-md/justSelf-end-md/justSelf-stretch-md` > 700px** <br/>
**CSS Class large: `justSelf-start-lg/justSelf-center-lg/justSelf-end-lg/justSelf-stretch-lg` > 1100px** <br/>

<br>
<br>
<br>

<br>
<br>
<br>

## hide Self

**CSS Class: `hide`** <br/><br/>
**CSS Class small: `hide-sm` > 400px** <br/>
**CSS Class medium: `hide-md` > 700px** <br/>
**CSS Class large: `hide-lg` > 1100px** <br/>

<br>
<br>
<br>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
