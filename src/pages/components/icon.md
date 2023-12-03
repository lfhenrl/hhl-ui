# Icon

## Size

You can change the size by the prop `size=""`<br>
The default is `"24px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4">
        <H_icon icon="edit" size="14px"></H_icon>
        <H_icon icon="edit"></H_icon>
        <H_icon icon="edit" size="44px"></H_icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Type

If you add the prop `btn` you will get a button effect-
You can change the type by the prop `btn="/standard/outline/outline-round/fill/fill-round"`<br>
The default is `"standard"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
        <H_icon icon="edit" btn="standard" ></H_icon>
        <H_icon icon="edit" btn="outline" ></H_icon>
        <H_icon icon="edit" btn="outline-round" ></H_icon>
        <H_icon icon="edit" btn="fill" ></H_icon>
        <H_icon icon="edit" btn="fill-round"></H_icon>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by adding one of the theme color classes<br>
`text-pri` `text-sec` `text-ok` `text-err` `text-warn` `text-info` `text-black` `text-white`<br>
The default is `currentcolor`.<br>
If you need a special color then just use `style="--current-bg-col: purple;--current-txt-col: white"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4">
        <H_icon icon="edit" class="col-pri"></H_icon>
        <H_icon icon="edit" class="col-sec"></H_icon>
        <H_icon icon="edit" class="col-ok"></H_icon>
        <H_icon icon="edit" class="col-err"></H_icon>
        <H_icon icon="edit" class="col-warn"></H_icon>
        <H_icon icon="edit" class="col-info"></H_icon>
        <H_icon icon="edit" class="col-black"></H_icon>
        <H_icon icon="edit" style="--current-bg-col: purple;--current-txt-col: white"></H_icon>
    </div>
    <div class="flex items-center gap-4 mt-4">
        <H_icon icon="edit" class="col-pri" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-sec" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-ok" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-err" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-warn" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-info" btn="outline"></H_icon>
        <H_icon icon="edit" class="col-black" btn="outline"></H_icon>
        <H_icon icon="edit" style="--current-bg-col: purple;--current-txt-col: white" btn="outline"></H_icon>
    </div>
    <div class="flex items-center gap-4 mt-4">
        <H_icon icon="edit" class="col-pri" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-sec" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-ok" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-err" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-warn" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-info" btn="outline-round"></H_icon>
        <H_icon icon="edit" class="col-black" btn="outline-round"></H_icon>
        <H_icon icon="edit" style="--current-bg-col: purple;--current-txt-col: white" btn="outline-round"></H_icon>
    </div>
    <div class="flex items-center gap-4 mt-4">
        <H_icon icon="edit" class="col-pri" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-sec" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-ok" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-err" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-warn" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-info" btn="fill"></H_icon>
        <H_icon icon="edit" class="col-black" btn="fill"></H_icon>
        <H_icon icon="edit" style="--current-bg-col: purple;--current-txt-col: white" btn="fill"></H_icon>
    </div>
    <div class="flex items-center gap-4 mt-4">
        <H_icon icon="edit" class="col-pri w-20 h-20 p-5" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-sec" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-ok" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-err" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-warn" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-info" btn="fill-round"></H_icon>
        <H_icon icon="edit" class="col-black" btn="fill-round"></H_icon>
        <H_icon icon="edit" style="--current-bg-col: purple;--current-txt-col: white" btn="fill-round"></H_icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<icon-list/>
<br>
<br>
