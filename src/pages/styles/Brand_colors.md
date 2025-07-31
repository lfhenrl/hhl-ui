## Brand colors

This is the Brand colors all defined as css properties, like `--color-xxx`.<br>
For each color there is a color on `--color-xxxTxt`, that have the text color that looks best on the background color

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <div class="flex flex-wrap">
      <div class="bg-pri text-priTxt flex items-center justify-center w-24 h-9">pri</div>
      <div class="bg-sec text-secTxt flex items-center justify-center w-24">sec</div>
      <div class="bg-ok text-okTxt flex items-center justify-center w-24">ok</div>
      <div class="bg-err text-errTxt flex items-center justify-center w-24">err</div>
      <div class="bg-warn text-warnTxt flex items-center justify-center w-24">warn</div>
      <div class="bg-info text-infoTxt flex items-center justify-center w-24">info</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Theme css variables

  <br/>

| Name            | Color                                                                                                  | Describtion                   |
| --------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------- |
| --color-pri     | <div class="bgBox col-pri"></div>                                                                      | The primary color.            |
| --color-priTxt  | <div style="background: var(--color-priTxt)" class="flex items-center justify-center w-24 h-9"></div>  | The text color for primary.   |
| --color-sec     | <div style="background: var(--color-sec)" class="flex items-center justify-center w-24 h-9"></div>     | The secondary color.          |
| --color-secTxt  | <div style="background: var(--color-secTxt)" class="flex items-center justify-center w-24 h-9"></div>  | The text color for secondary. |
| --color-ok      | <div style="background: var(--color-ok)" class="flex items-center justify-center w-24 h-9"></div>      | The ok color.                 |
| --color-okTxt   | <div style="background: var(--color-okTxt)" class="flex items-center justify-center w-24 h-9"></div>   | The text color for ok.        |
| --color-err     | <div style="background: var(--color-err)" class="flex items-center justify-center w-24 h-9"></div>     | The error color.              |
| --color-errTxt  | <div style="background: var(--color-errTxt)" class="flex items-center justify-center w-24 h-9"></div>  | The text color for error.     |
| --color-warn    | <div style="background: var(--color-warn)" class="flex items-center justify-center w-24 h-9"></div>    | The warning color.            |
| --coloe-warnTxt | <div style="background: var(--color-warnTxt)" class="flex items-center justify-center w-24 h-9"></div> | The text color for warning.   |
| --color-info    | <div style="background: var(--color-info)" class="flex items-center justify-center w-24 h-9"></div>    | The info color.               |
| --color-infoTxt | <div style="background: var(--color-infoTxt)" class="flex items-center justify-center w-24 h-9"></div> | The text color for info.      |

<br/>
