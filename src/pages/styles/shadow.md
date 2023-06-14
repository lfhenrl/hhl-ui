## Shadow system

<hhl-live-editor title="Shadow" htmlCode='
    <template>
    <H_row>
      <div class="shadow-0">shadow-0</div>
      <div class="shadow-1">shadow-1</div>
      <div class="shadow-2">shadow-2</div>
      <div class="shadow-3">shadow-3</div>
      <div class="shadow-4">shadow-4</div>
      <div class="shadow-5">shadow-5</div>
    </row>
    </template>
    <xstyle>
      div div {
        padding: 20px; 
        text-align: center;
      }
    </xstyle>
'>
</hhl-live-editor>

<br/>
<br/>

## Color css variables

| Name       | Color                                  | Describtion |
| ---------- | -------------------------------------- | ----------- |
| --shadow-1 | <div class="boxCssVar shadow-1"></div> | .           |
| --shadow-2 | <div class="boxCssVar shadow-2"></div> | .           |
| --shadow-3 | <div class="boxCssVar shadow-3"></div> | .           |
| --shadow-4 | <div class="boxCssVar shadow-4"></div> | .           |
| --shadow-5 | <div class="boxCssVar shadow-5"></div> | .           |

<br/>

<style>
.boxCssVar {
    height: 40px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 11px;
    margin-bottom: 11px;
}
</style>
