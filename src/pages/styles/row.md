## The row layout

The main idea in this row layout is to use the standard CSS flexbox and by properties setting aligment, justify, gap and padding.

#### Some links to the standard

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox" target="_blank">Basic concepts of flexbox</a><br>
<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank">A Complete Guide to Flexbox</a><br>
<a href="https://yoksel.github.io/flex-cheatsheet/" target="_blank">Flex Cheatsheet</a><br>

## H_row

- Use the Vue component `H_row`.

::: tip
You can edit the code examples.
:::

<br>

<br>

## Align

Placement in the row axis (up-down) in the container.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_row>
     <H_select v-model="val" :select-data="alignContentList" label="Align Content"></H_select>
    </H_row>
    <H_row class="boxes" :align="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("stretch");
      const alignContentList = ref(["start", "center", "end", "stretch", "baseline"]);
    return {
    val,
    alignContentList
    }
    </script>
    <xstyle>
    .boxes {
        height: 200px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
        padding: 10px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 100px;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

<br>

## Justify

Placement in the row axis (left-right) in the container.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_row>
     <H_select v-model="val" :select-data="alignContentList" label="Align Content"></H_select>
    </H_row>
    <H_row class="boxes" :justify="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("start");
      const alignContentList = ref(["start", "center", "end", "space-between", "space-around", "space-evenly"]);
    return {
    val,
    alignContentList
    }
    </script>
    <xstyle>
    .boxes {
        height: 200px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
        padding: 10px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 100px;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

<br>

## Gap

Sets the gaps (gutters) between rows and columns.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_row>
     <H_input v-model="val" :select-data="alignContentList" label="Align Content"></H_input>
    </H_row>
    <H_row class="boxes" :gap="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("10px");
    return {
    val,
    alignContentList
    }
    </script>
    <xstyle>
    .boxes {
        height: 200px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
        padding: 10px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 100px;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>
