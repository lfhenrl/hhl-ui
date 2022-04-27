## The flexBox system

The main idea in this flexbox system is to use the standard CSS flexbox and by properties setting direction, aligment, justify, gap, wrap and padding.

#### Some links to the standard

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox" target="_blank">Basic concepts of flexbox</a><br>
<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank">A Complete Guide to Flexbox</a><br>
<a href="https://yoksel.github.io/flex-cheatsheet/" target="_blank">Flex Cheatsheet</a><br>

## H_flex

- Use the Vue component `H_flex`.

::: tip
You can edit the code examples.
:::

<br>

## flex-direction

<br>

**Properties: `flx_direction="row or column" ` (default is row).**
<br>

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex flx_padding="15px" flx_justify="space-around">
      <H_flex flx_padding="15px">
      ROW
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_direction="column" flx_padding="15px">
      COLUMN
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <xstyle>
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br>

## flex-wrap

<br>

**Properties: `flx_wrap="wrap or nowrap" ` (default is wrap).**
<br>

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex flx_padding="15px" flx_justify="space-around">
      <H_flex flx_padding="15px">
      WRAP
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_padding="15px" flx_wrap="nowrap">
      NOWRAP
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <xstyle>
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        max-width: 100px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## flex-gap

<br>

**Properties: `flx_gap="px/em/% etc" ` (default is 10px).**
<br>

If you add 1 value it will add the same gap to both rows and columns.<br>
If you add 2 values the first will be the gap between rows and the second will be gap between columns

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex flx_padding="15px" flx_justify="space-around">
      <H_flex flx_padding="15px" flx_gap="10px">
      flx_gap="10px"
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_padding="15px" flx_gap="40px 10px">
      flx_gap="40px 10px"
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <xstyle>
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        max-width: 200px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br/>

## padding

<br>

**Properties: `flx_padding="px/em/% etc" ` (default is 0).**
<br>

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex flx_padding="15px" flx_justify="space-around">
      <H_flex flx_padding="10px">
      flx_padding="10px"
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_padding="50px" >
      flx_padding="50px"
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <xstyle>
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        max-width: 200px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br>

## align-items

<br>

**Properties: `flx_align="stretch" | "start" | "end" | "center" ` (default is center).**
<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <H_select v-model="val" :select-data="[`stretch`, `start`, `end`, `center`]" label="flx_align"></H_select>
    <H_flex flx_padding="15px" flx_justify="space-around">   
      <H_flex flx_padding="15px" :flx_align="val">
      ROW
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_direction="column" flx_padding="15px" :flx_align="val">
      COLUMN
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <script>
      const val = ref("center");
    return {val}
    </script>
    <xstyle>
      .H_select {
        margin-bottom: 22px;
      }
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        width: 200px;
        height: 200px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br/>

<br>

## justify-content

<br>

**Properties: `flx_justify="stretch" | "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" ` (default is stretch).**
<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <H_select v-model="val" :select-data="[`start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`]" label="flx_justify"></H_select>
    <H_flex flx_padding="15px" flx_justify="space-around">   
      <H_flex flx_padding="15px" :flx_justify="val" >
      ROW
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_direction="column" flx_padding="15px" :flx_justify="val">
      COLUMN
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <script>
      const val = ref("start");
    return {val}
    </script>
    <xstyle>
      .H_select {
        margin-bottom: 22px;
      }
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        width: 200px;
        height: 300px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br/>

<br>

## align-self

<br>

**CSS Class: `alignSelf-start/alignSelf-center/alignSelf-end/alignSelf-stretch`** <br/>

The default is stretch.<br/>
The selected `alignSelf` class is bound to box 2.
<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <H_select v-model="val" :select-data="[`alignSelf-start`, `alignSelf-center`, `alignSelf-end`, `alignSelf-stretch`]" label="align-self"></H_select>
    <H_flex flx_padding="15px" flx_justify="space-around">   
      <H_flex flx_padding="15px">
      ROW
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
      </H_flex>
      <H_flex flx_direction="column" flx_padding="15px">
      COLUMN
        <div>1</div>
        <div :class="val">2</div>
        <div>3</div>
      </H_flex>
    </H_flex>
    </template>
    <script>
      const val = ref("alignSelf-start");
    return {val}
    </script>
    <xstyle>
      .H_select {
        margin-bottom: 22px;
      }
      .H_flex {
        box-shadow: var(--shadow-2);
      }
      .H_flex > .H_flex {
        width: 200px;
        height: 300px;
        }
      .H_flex > .H_flex > div {
        min-height: 25px;
        min-width: 24px;
        background-color: var(--col-pri);
        color: white;
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

<br/>
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
