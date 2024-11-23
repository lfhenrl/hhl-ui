# Icon

## Size

You can change the size by the font-size `text-xs sm,base,lg,xl,2xl,3xl....`<br>
Default is `text-base`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex  gap-6 flex-wrap">
        <div class="ico-edit text-xs">xs</div>
        <div class="ico-edit text-sm">sm</div>
        <div class="ico-edit">base</div>
        <div class="ico-edit text-lg">lg</div>
        <div class="ico-edit text-xl">xl</div>
        <div class="ico-edit text-2xl">2xl</div>
        <div class="ico-edit text-3xl">3xl</div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the class `"text-pri,sec,ok,err,warn,info,txt0-6"`<br>
The default is `text0`.<br>

If you need a special color then just use `style="color: lime"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <div class="ico-edit text-pri">pri</div> 
            <div class="ico-edit text-ok">sec</div> 
            <div class="ico-edit text-pri">ok</div>
            <div class="ico-edit text-err">err</div>
            <div class="ico-edit text-warn">warn</div>
            <div class="ico-edit text-info">info</div>
            <div class="ico-edit text-txt0">txt0</div>
            <div class="ico-edit text-txt1">txt1</div>
            <div class="ico-edit text-txt2">txt2</div>
            <div class="ico-edit text-txt3">txt3</div>
            <div class="ico-edit text-txt4">txt4</div>
            <div class="ico-edit text-txt5">txt5</div>
            <div class="ico-edit text-txt6">txt6</div>
             <div class="ico-edit" style="color:lime">lime</div>
      </div>
      </template>
'>
</hhl-live-editor>
<br>

## Icon button

If you add the class `iconBtn/iconBtn-outline/iconBtn-outline-round/iconBtn-filled/iconBtn-filled-round` you will get a button effect.


<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex flex-col items-center gap-2">
        <div class="text-xs">iconBtn</div>
          <div class="ico-save iconBtn"></div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="text-xs">iconBtn-outline</div>
          <div class="ico-save iconBtn-outline"></div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="text-xs">iconBtn-outline-round</div>
          <div class="ico-save iconBtn-outline-round"></div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="text-xs">iconBtn-filled</div>
          <div class="ico-save  iconBtn-filled"></div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="text-xs">iconBtn-filled-round</div>
          <div class="ico-save iconBtn-filled-round"></div>
        </div>
      </div>
      </template>
'>
</hhl-live-editor>

<br>



## Icon button Color

You can change the color by the class `"col-pri,sec,ok,err,warn,info"`<br>

If you need a special color then just use `style="--color-current-bg-col: purple;--color-current-txt-col: white"`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4 flex-wrap">
      <div class="ico-save iconBtn"></div>
      <div class="ico-save iconBtn col-pri"></div>
      <div class="ico-save iconBtn col-sec"></div>
      <div class="ico-save iconBtn col-ok"></div>
      <div class="ico-save iconBtn col-err"></div>
      <div class="ico-save iconBtn col-warn"></div>
      <div class="ico-save iconBtn col-info"></div>
      <div class="ico-save iconBtn" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div class="ico-save iconBtn-outline"></div>
      <div class="ico-save iconBtn-outline col-pri"></div>
      <div class="ico-save iconBtn-outline col-sec"></div>
      <div class="ico-save iconBtn-outline col-ok"></div>
      <div class="ico-save iconBtn-outline col-err"></div>
      <div class="ico-save iconBtn-outline col-warn"></div>
      <div class="ico-save iconBtn-outline col-info"></div>
      <div class="ico-save iconBtn-outline" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div class="ico-save iconBtn-outline-round"></div>
      <div class="ico-save iconBtn-outline-round col-pri"></div>
      <div class="ico-save iconBtn-outline-round col-sec"></div>
      <div class="ico-save iconBtn-outline-round col-ok"></div>
      <div class="ico-save iconBtn-outline-round col-err"></div>
      <div class="ico-save iconBtn-outline-round col-warn"></div>
      <div class="ico-save iconBtn-outline-round col-info"></div>
      <div class="ico-save iconBtn-outline-round" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div class="ico-save iconBtn-filled"></div>
      <div class="ico-save iconBtn-filled col-pri"></div>
      <div class="ico-save iconBtn-filled col-sec"></div>
      <div class="ico-save iconBtn-filled col-ok"></div>
      <div class="ico-save iconBtn-filled col-err"></div>
      <div class="ico-save iconBtn-filled col-warn"></div>
      <div class="ico-save iconBtn-filled col-info"></div>
      <div class="ico-save iconBtn-filled" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div class="ico-save iconBtn-filled-round"></div>
      <div class="ico-save iconBtn-filled-round col-pri"></div>
      <div class="ico-save iconBtn-filled-round col-sec"></div>
      <div class="ico-save iconBtn-filled-round col-ok"></div>
      <div class="ico-save iconBtn-filled-round col-err"></div>
      <div class="ico-save iconBtn-filled-round col-warn"></div>
      <div class="ico-save iconBtn-filled-round col-info"></div>
      <div class="ico-save iconBtn-filled-round" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon button Disabled

<hhl-live-editor title="" htmlCode='
 <template>
     <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4 flex-wrap">
      <div disabled class="ico-save iconBtn"></div>
      <div disabled class="ico-save iconBtn col-pri"></div>
      <div disabled class="ico-save iconBtn col-sec"></div>
      <div disabled class="ico-save iconBtn col-ok"></div>
      <div disabled class="ico-save iconBtn col-err"></div>
      <div disabled class="ico-save iconBtn col-warn"></div>
      <div disabled class="ico-save iconBtn col-info"></div>
      <div disabled class="ico-save iconBtn" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div disabled class="ico-save iconBtn-outline"></div>
      <div disabled class="ico-save iconBtn-outline col-pri"></div>
      <div disabled class="ico-save iconBtn-outline col-sec"></div>
      <div disabled class="ico-save iconBtn-outline col-ok"></div>
      <div disabled class="ico-save iconBtn-outline col-err"></div>
      <div disabled class="ico-save iconBtn-outline col-warn"></div>
      <div disabled class="ico-save iconBtn-outline col-info"></div>
      <div disabled class="ico-save iconBtn-outline" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div disabled class="ico-save iconBtn-outline-round"></div>
      <div disabled class="ico-save iconBtn-outline-round col-pri"></div>
      <div disabled class="ico-save iconBtn-outline-round col-sec"></div>
      <div disabled class="ico-save iconBtn-outline-round col-ok"></div>
      <div disabled class="ico-save iconBtn-outline-round col-err"></div>
      <div disabled class="ico-save iconBtn-outline-round col-warn"></div>
      <div disabled class="ico-save iconBtn-outline-round col-info"></div>
      <div disabled class="ico-save iconBtn-outline-round" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div disabled class="ico-save iconBtn-filled"></div>
      <div disabled class="ico-save iconBtn-filled col-pri"></div>
      <div disabled class="ico-save iconBtn-filled col-sec"></div>
      <div disabled class="ico-save iconBtn-filled col-ok"></div>
      <div disabled class="ico-save iconBtn-filled col-err"></div>
      <div disabled class="ico-save iconBtn-filled col-warn"></div>
      <div disabled class="ico-save iconBtn-filled col-info"></div>
      <div disabled class="ico-save iconBtn-filled" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <div disabled class="ico-save iconBtn-filled-round"></div>
      <div disabled class="ico-save iconBtn-filled-round col-pri"></div>
      <div disabled class="ico-save iconBtn-filled-round col-sec"></div>
      <div disabled class="ico-save iconBtn-filled-round col-ok"></div>
      <div disabled class="ico-save iconBtn-filled-round col-err"></div>
      <div disabled class="ico-save iconBtn-filled-round col-warn"></div>
      <div disabled class="ico-save iconBtn-filled-round col-info"></div>
      <div disabled class="ico-save iconBtn-filled-round" style="--color-current-bg-col: purple;--color-current-txt-col: white"></div>
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
