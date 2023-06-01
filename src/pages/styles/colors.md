## Background colors

<hhl-live-editor title="Background colors" htmlCode='
    <template>
    <H_flex>
      <div class="col-bg-0">col-bg-0</div>
      <div class="col-bg-1">col-bg-1</div>
      <div class="col-bg-2">col-bg-2</div>
      <div class="col-bg-3">col-bg-3</div>
      <div class="col-bg-4">col-bg-4</div>
      <div class="col-bg-5">col-bg-5</div>
      <div class="col-bg-6">col-bg-6</div>
    </H_flex>
    </template>
    <xstyle>
      div div {
        padding: 9px 0;
        margin: 4px 0;
        width: 120px;
        text-align: center; 
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Text colors

<hhl-live-editor title="Text colors" htmlCode='
    <template>
      <H_flex>
        <h3 class="col-txt-0">col-txt-0</h3>
        <h3 class="col-txt-1">col-txt-1</h3>
        <h3 class="col-txt-2">col-txt-2</h3>
        <h3 class="col-txt-3">col-txt-3</h3>
        <h3 class="col-txt-4">col-txt-4</h3>
        <h3 class="col-txt-5">col-txt-5</h3>
        <h3 class="col-txt-6">col-txt-6</h3>
      </H_flex>
    </template>
    <xstyle>
      h3 {
        padding:3px 9px;
        margin: 0;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Color css variables

  <br/>

### Background colors.

| Name       | Color                                  | Describtion                |
| ---------- | -------------------------------------- | -------------------------- |
| --col-bg-0 | <div class="boxCssVar col-bg-0"></div> | The bg-0 background color. |
| --col-bg-1 | <div class="boxCssVar col-bg-1"></div> | The bg-1 background color. |
| --col-bg-2 | <div class="boxCssVar col-bg-2"></div> | The bg-2 background color. |
| --col-bg-3 | <div class="boxCssVar col-bg-3"></div> | The bg-3 background color. |
| --col-bg-4 | <div class="boxCssVar col-bg-4"></div> | The bg-4 background color. |
| --col-bg-5 | <div class="boxCssVar col-bg-5"></div> | The bg-5 background color. |
| --col-bg-6 | <div class="boxCssVar col-bg-6"></div> | The bg-6 background color. |

<br/>

### Text colors.

| Name        | Color                                                                    | Describtion      |
| ----------- | ------------------------------------------------------------------------ | ---------------- |
| --col-txt-0 | <div class="boxCssVar" style="background-color: var(--col-txt-0)"></div> | The txt-0 color. |
| --col-txt-1 | <div class="boxCssVar" style="background-color: var(--col-txt-1)"></div> | The txt-1 color. |
| --col-txt-2 | <div class="boxCssVar" style="background-color: var(--col-txt-2)"></div> | The txt-2 color. |
| --col-txt-3 | <div class="boxCssVar" style="background-color: var(--col-txt-3)"></div> | The txt-3 color. |
| --col-txt-4 | <div class="boxCssVar" style="background-color: var(--col-txt-4)"></div> | The txt-4 color. |
| --col-txt-5 | <div class="boxCssVar" style="background-color: var(--col-txt-5)"></div> | The txt-5 color. |
| --col-txt-6 | <div class="boxCssVar" style="background-color: var(--col-txt-6)"></div> | The txt-6 color. |

<br/>

<style>
.boxCssVar {
    height: 40px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    box-shadow: var(--shadow-1);
}
</style>
