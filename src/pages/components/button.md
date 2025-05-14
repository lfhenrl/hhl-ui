# Button

## Size

You can change the size by the size property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`


<hhl-live-editor title=""  htmlCode='
<template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_btn size="xs"><H_icon name="mail"  color="white" size="1.3em"></H_icon>XS</H_btn>
            <H_btn size="sm"><H_icon name="mail"  color="white" size="1.3em"></H_icon>SM</H_btn>
            <H_btn size="md"><H_icon name="mail" color="white" size="1.3em"></H_icon>MD (Default)</H_btn>
            <H_btn size="lg"><H_icon name="mail"  color="white" size="1.3em"></H_icon>LG</H_btn>
            <H_btn size="xl"><H_icon name="mail"  color="white" size="1.3em"></H_icon>XL</H_btn>
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

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "neutral" | "neutral-light"`. <br>
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
            <H_btn color="neutral">NEUTRAL</H_btn>
            <H_btn color="neutral-light">NEUTRAL-LIGHT</H_btn>
            <H_btn style="background-color: purple; color:white">purple</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
