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
     <H_select v-model="val" :list="alignList" label="Align"></H_select>
    </H_row>
    <H_row class="boxes" :align="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("stretch");
      const alignList = ref(["start", "center", "end", "stretch", "baseline"]);
    return {
    val,
    alignList
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
     <H_select v-model="val" :list="justifyList" label="Justify"></H_select>
    </H_row>
    <H_row class="boxes" :justify="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("start");
      const justifyList = ref(["start", "center", "end", "space-between", "space-around", "space-evenly"]);
    return {
    val,
    justifyList
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
     <H_inputText v-model="val" label="Gap"></H_inputText>
    </H_row>
    <H_row class="boxes" :gap="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("10px 44px");
    return {
    val
    }
    </script>
    <xstyle>
    .boxes {
        height: 400px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
        padding: 10px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 33%;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

<br>

## No Wrap

Sets whether flex items are forced onto one line or can wrap onto multiple lines..
The default is wrap. But adding the property "no-wrap" will remove wrap.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_row>
     <H_switch v-model="val" label="No Wrap"></H_switch>
    </H_row>
    <H_row class="boxes" gap="10px" :no-wrap="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref(false);
    return {
    val
    }
    </script>
    <xstyle>
    .boxes {
        height: 400px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 33%;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

<br>

## Padding

Sets the padding for the box;
The default is 10px.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_row>
      <H_inputText v-model="val" label="Padding"></H_inputText>
    </H_row>
    <H_row class="boxes" gap="10px" :padding="val">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </H_row>
    </template>
        <script>
      const val = ref("50px 10px");
    return {
    val
    }
    </script>
    <xstyle>
    .boxes {
        height: 400px;
        border: 1px solid var(--col-txt-3);
        margin-top: 20px;
    }
      .boxes > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 33%;
        background-color: var(--col-pri);
        color: white;
      }
    </xstyle>
'>
</hhl-live-editor>