# Button

## Size

You can change the size by the font-size `text-xs sm,base,lg,xl,2xl,3xl....`<br>
Default is `text-base`


<hhl-live-editor title=""  htmlCode='
<template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn class="text-xs"><H_icon name="mail"  color="white" size="1.6em"></H_icon>XS</H_btn>
            <H_btn class="text-sm"><H_icon name="mail"  color="white" size="1.6em"></H_icon>SM</H_btn>
            <H_btn ><H_icon name="mail" color="white" size="1.6em"></H_icon>Base (Default)</H_btn>
            <H_btn class="text-lg"><H_icon name="mail"  color="white" size="1.6em"></H_icon>LG</H_btn>
            <H_btn class="text-xl"><H_icon name="mail"  color="white" size="1.6em"></H_icon>XL</H_btn>
            <H_btn class="text-2xl"><H_icon name="mail"  color="white" size="1.6em"></H_icon>2xl</H_btn>
            <H_btn class="text-3xl"><H_icon name="mail"  color="white" size="1.6em"></H_icon>3xl</H_btn>
      </div>
</template>
'>
</hhl-live-editor>
<br>

## Icon

You can add a icon <br>

<hhl-live-editor title="" htmlCode='
      <template>
            <div class="flex items-center gap-4 flex-wrap">
            <H_btn><H_icon name="mail" color="white" size="1.6em"></H_icon>ICON mail</H_btn>
            <H_btn><H_icon name="save" color="err" size="1.6em"></H_icon>ICON save Red</H_btn>
            <H_btn>icon save right <H_icon name="save" color="white" size="1.6em"></H_icon></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Type

You can change the type by the prop `type="/standard/outline/text"`<br>
The default is `"standard"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn>STANDARD</H_btn>
            <H_btn type="outline" icon="mail">OUTLINE</H_btn>
            <H_btn type="text" icon="mail">TEXT</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn disabled>STANDARD</H_btn>
            <H_btn disabled type="outline">OUTLINE</H_btn>
            <H_btn disabled type="text">TEXT</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the class `"col-pri,sec,ok,err,warn,info"`<br>
The default is `pri`.<br>

If you need a special color then just use `style="background-color: purple: color: white"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn class="col-pri">Primery</H_btn>
            <H_btn class="col-sec">Secondary</H_btn>
            <H_btn class="col-ok">Ok</H_btn>
            <H_btn  class="col-err">Error</H_btn>
            <H_btn  class="col-warn">Warning</H_btn>
            <H_btn  class="col-info">Information</H_btn>
            <H_btn style="background-color: purple; color:white">White</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
