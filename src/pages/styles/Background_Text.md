## Background colors

<style>
  .bgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 90px;
  }
</style>

<hhl-live-editor title="Background colors" htmlCode='
    <template>
    <div h-display="flex"> 
      <div h-bgcolor="var(--bgcol-0)" class="bgBox">bgcol-0</div>
      <div h-bgcolor="var(--bgcol-1)" class="bgBox">bgcol-1</div>
      <div h-bgcolor="var(--bgcol-2)" class="bgBox">bgcol-2</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Text colors

<hhl-live-editor title="Colors" htmlCode='
<template>

   <div h-display="flex" h-flex-wrap="wrap" h-color="var(--bgcol-0)">
      <div h-bgcolor="var(--col-0)"  class="bgBox">col-0</div>
      <div h-bgcolor="var(--col-1)" class="bgBox">col-1</div>
      <div h-bgcolor="var(--col-2)" class="bgBox">col-2</div>
      <div h-bgcolor="var(--col-3)" class="bgBox">col-3</div>
      <div h-bgcolor="var(--col-4)" class="bgBox">col-4</div>
      <div h-bgcolor="var(--col-5)" class="bgBox">col-5</div>
      <div h-bgcolor="var(--col-6)" class="bgBox">col-6</div>
      <div h-bgcolor="var(--col-7)" class="bgBox">col-7</div>
      <div h-bgcolor="var(--col-8)" class="bgBox">col-8</div>
      <div h-bgcolor="var(--col-9)" class="bgBox">col-9</div>
    </div>
</template>
'>
</hhl-live-editor>
<br/>

## Color css variables

  <br/>

### Background colors.

| Name      | Color                                                              | Describtion                   |
| --------- | ------------------------------------------------------------------ | ----------------------------- |
| --bgcol-0 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--bgcol-0)"></div> | The bgcol-0 background color. |
| --bgcol-1 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--bgcol-1)"></div> | The bgcol-1 background color. |
| --bgcol-2 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--bgcol-2)"></div> | The bgcol-2 background color. |

<br/>

### Text colors.

| Name    | Color                                                            | Describtion      |
| ------- | ---------------------------------------------------------------- | ---------------- |
| --col-0 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-0)"></div> | The col-0 color. |
| --col-1 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-1)"></div> | The col-1 color. |
| --col-2 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-2)"></div> | The col-2 color. |
| --col-3 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-3)"></div> | The col-3 color. |
| --col-4 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-4)"></div> | The col-4 color. |
| --col-5 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-5)"></div> | The col-5 color. |
| --col-6 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-6)"></div> | The col-6 color. |
| --col-7 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-7)"></div> | The col-7 color. |
| --col-8 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-8)"></div> | The col-8 color. |
| --col-9 | <div class="bgBox" h-shadow="lg" h-bgcolor="var(--col-9)"></div> | The col-9 color. |

<br/>
