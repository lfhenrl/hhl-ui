# Icon

## Size

You can change the size by the prop `size=""`<br>
The default is `"24px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
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
      <div class="flex items-center gap-4 flex-wrap">
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

You can change the color by the prop `color="7current/pri/sec/ok/err/warn/info/"`<br>
The default is `current`.<br>
If you need a special color then just use `style="--current-bg-col: purple;--current-txt-col: white"`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn></H_icon>
        <H_icon icon="edit" color="pri" btn></H_icon>
        <H_icon icon="edit" color="sec" btn></H_icon>
        <H_icon icon="edit" color="ok" btn></H_icon>
        <H_icon icon="edit" color="err" btn></H_icon>
        <H_icon icon="edit" color="warn" btn></H_icon>
        <H_icon icon="edit" color="info" btn></H_icon>
        <H_icon icon="edit" btn style="color: purple"></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="outline"></H_icon>
        <H_icon icon="edit" color="pri" btn="outline"></H_icon>
        <H_icon icon="edit" color="sec" btn="outline"></H_icon>
        <H_icon icon="edit" color="ok" btn="outline"></H_icon>
        <H_icon icon="edit" color="err" btn="outline"></H_icon>
        <H_icon icon="edit" color="warn" btn="outline"></H_icon>
        <H_icon icon="edit" color="info" btn="outline"></H_icon>
        <H_icon icon="edit" style="color: purple" btn="outline"></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="pri" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="sec" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="ok" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="err" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="warn" btn="outline-round"></H_icon>
        <H_icon icon="edit" color="info" btn="outline-round"></H_icon>
        <H_icon icon="edit" style="color: purple" btn="outline-round"></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="fill"></H_icon>
        <H_icon icon="edit" color="pri" btn="fill"></H_icon>
        <H_icon icon="edit" color="sec" btn="fill"></H_icon>
        <H_icon icon="edit" color="ok" btn="fill"></H_icon>
        <H_icon icon="edit" color="err" btn="fill"></H_icon>
        <H_icon icon="edit" color="warn" btn="fill"></H_icon>
        <H_icon icon="edit" color="info" btn="fill"></H_icon>
        <H_icon icon="edit" style="background: purple;color: white" btn="fill"></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="pri" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="sec" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="ok" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="err" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="warn" btn="fill-round"></H_icon>
        <H_icon icon="edit" color="info" btn="fill-round"></H_icon>
        <H_icon icon="edit" style="background: purple;color: white" btn="fill-round"></H_icon>
    </div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Disabled

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn disabled></H_icon>
        <H_icon icon="edit" color="pri" btn disabled></H_icon>
        <H_icon icon="edit" color="sec" btn disabled></H_icon>
        <H_icon icon="edit" color="ok" btn disabled></H_icon>
        <H_icon icon="edit" color="err" btn disabled></H_icon>
        <H_icon icon="edit" color="warn" btn disabled></H_icon>
        <H_icon icon="edit" color="info" btn disabled></H_icon>
        <H_icon icon="edit" btn style="color: purple" disabled></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="pri" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="sec" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="ok" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="err" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="warn" btn="outline" disabled></H_icon>
        <H_icon icon="edit" color="info" btn="outline" disabled></H_icon>
        <H_icon icon="edit" style="color: purple" btn="outline" disabled></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="pri" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="sec" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="ok" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="err" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="warn" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" color="info" btn="outline-round" disabled></H_icon>
        <H_icon icon="edit" style="color: purple" btn="outline-round" disabled></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="pri" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="sec" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="ok" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="err" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="warn" btn="fill" disabled></H_icon>
        <H_icon icon="edit" color="info" btn="fill" disabled></H_icon>
        <H_icon icon="edit" style="background: purple;color: white" btn="fill" disabled></H_icon>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
        <H_icon icon="edit" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="pri" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="sec" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="ok" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="err" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="warn" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" color="info" btn="fill-round" disabled></H_icon>
        <H_icon icon="edit" style="background: purple;color: white" btn="fill-round" disabled></H_icon>
    </div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<icon-list/>
<br>
<br>
