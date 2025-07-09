# Button

## Size

You can change the size by the size property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`<br>
If you need a special size then just use `style="font-size: 44px"` or `class="text-3xl"`

<hhl-live-editor title=""  htmlCode='
<template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn size="xs" ><H_icon name="mail"  color="white" size="1.3em"></H_icon>XS</H_btn>
            <H_btn size="sm"><H_icon name="mail"  color="white" size="1.3em"></H_icon>SM</H_btn>
            <H_btn size="md"><H_icon name="mail" color="white" size="1.3em"></H_icon>MD (Default)</H_btn>
            <H_btn size="lg"><H_icon name="mail"  color="white" size="1.3em"></H_icon>LG</H_btn>
            <H_btn size="xl"><H_icon name="mail"  color="white" size="1.3em"></H_icon>XL</H_btn>
            <H_btn style="font-size: 28px"><H_icon name="mail"  color="white" size="1.3em"></H_icon>style</H_btn>
            <H_btn class="text-3xl"><H_icon name="mail"  color="white" size="1.3em"></H_icon>class</H_btn>
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
            <H_btn><H_icon name="mail" color="white" size="1.3em"></H_icon>ICON mail</H_btn>
            <H_btn><H_icon name="save" color="err" size="1.3em"></H_icon>ICON save Red</H_btn>
            <H_btn>icon save right <H_icon name="save" color="white" size="1.3em"></H_icon></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Variant

You can change the type by the variant property `standard" | "outline" | "text"`<br>
The default is `"standard"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn>STANDARD</H_btn>
            <H_btn variant="outline">OUTLINE</H_btn>
            <H_btn variant="text">TEXT</H_btn>
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

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7"`. <br>
The default is `pri`.<br>

If you need a special color then just use `style="background-color: purple: color: white"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn>PRI</H_btn>
            <H_btn color="sec">SEC</H_btn>
            <H_btn color="ok">OK</H_btn>
            <H_btn color="err">ERR</H_btn>
            <H_btn color="warn">Warn</H_btn>
            <H_btn color="info">INFO</H_btn>
            <H_btn color="white">WHITE</H_btn>
            <H_btn color="black">BLACK</H_btn>
            <H_btn color="txt0">TXT0</H_btn>
            <H_btn color="txt1">TXT1</H_btn>
            <H_btn color="txt2">TXT2</H_btn>
            <H_btn color="txt3">TXT3</H_btn>
            <H_btn color="txt4">TXT4</H_btn>
            <H_btn color="txt5">TXT5</H_btn>
            <H_btn color="txt6">TXT6</H_btn>
            <H_btn color="txt7">TXT7</H_btn>
            <H_btn style="background-color: purple; color:white">purple</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
