## Theme colors

<style>
  .colors-bgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 112px;
  }
</style>

This is the themes colors that can be added by class.
It set the background-color and the color of the text.

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <div class="flexRow gap-4 flexWrap">
      <div class="col-pri colors-bgBox shadow">col-pri</div>
      <div class="col-sec colors-bgBox shadow">col-sec</div>
      <div class="col-err colors-bgBox shadow">col-err</div>
      <div class="col-warn colors-bgBox shadow">col-warn</div>
      <div class="col-ok colors-bgBox shadow">col-ok</div>
      <div class="col-info colors-bgBox shadow">col-info</div>
      <div class="col-black colors-bgBox shadow">col-black</div>
      <div class="col-white colors-bgBox shadow">col-white</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Theme background colors

This is the themes background colors that can be added by class witout coloring the text..

<hhl-live-editor title="Theme background colors" htmlCode='
    <template>
    <div class="flexRow gap-4 flexWrap">
      <div class="bg-pri colors-bgBox shadow">bg-pri</div>
      <div class="bg-sec colors-bgBox shadow">bg-sec</div>
      <div class="bg-err colors-bgBox shadow">bg-err</div>
      <div class="bg-warn colors-bgBox shadow">bg-warn</div>
      <div class="bg-ok colors-bgBox shadow">bg-ok</div>
      <div class="bg-info colors-bgBox shadow">bg-info</div>
      <div class="bg-black colors-bgBox shadow">bg-black</div>
      <div class="bg-white colors-bgBox shadow">bg-white</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Theme text colors

This is the themes text colors that can be added by class.

<hhl-live-editor title="Theme text colors" htmlCode='
    <template>
      <div class="flexRow gap-4 flexWrap">
        <h3 class="text-pri colors-bgBox shadow">text-pri</h3>
        <h3 class="text-sec colors-bgBox shadow">text-sec</h3>
        <h3 class="text-err colors-bgBox shadow">text-err</h3>
        <h3 class="text-warn colors-bgBox shadow">text-warn</h3>
        <h3 class="text-ok colors-bgBox shadow">text-ok</h3>
        <h3 class="text-info colors-bgBox shadow">text-info</h3>
        <h3 class="text-black colors-bgBox shadow">text-black</h3>
        <h3 class="text-white bg-black colors-bgBox shadow">text-white</h3>
      </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Theme css variables

  <br/>

| Name          | Color                                                                               | Describtion                   |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| --col-pri     | <div class="col-pri colors-bgBox shadow"></div>                                        | The primary color.            |
| --col-on-pri  | <div class="col-pri colors-bgBox shadow">TEXT</div>   | The text color for primary.   |
| --col-sec     | <div class="col-sec colors-bgBox shadow"></div>                                        | The secondary color.          |
| --col-on-sec  | <div class="col-sec colors-bgBox shadow">TEXT</div>   | The text color for secondary. |
| --col-ok      | <div class="col-ok colors-bgBox shadow"></div>                                         | The ok color.                 |
| --col-on-ok   | <div class="col-ok colors-bgBox shadow">TEXT</div>    | The text color for ok.        |
| --col-err     | <div class="col-err colors-bgBox shadow"></div>                                        | The error color.              |
| --col-on-err  | <div class="col-err colors-bgBox shadow">TEXT</div>   | The text color for error.     |
| --col-warn    | <div class="col-warn colors-bgBox shadow"></div>                                       | The warning color.            |
| --col-on-warn | <div class="col-warn colors-bgBox shadow">TEXT</div>        | The text color for warning.   |
| --col-info    | <div class="col-info colors-bgBox shadow"></div>                                       | The info color.               |
| --col-on-info | <div class="col-info colors-bgBox shadow" >TEXT</div> | The text color for info.      |

<br/>
