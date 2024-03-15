# Button

## Size

You can change the size by the prop `size="/sm/md/lg"`<br>
The default is `"md"`.

<hhl-live-editor title=""  htmlCode='
<template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_btn size="sm">SM</H_btn>
            <H_btn size="md">MD</H_btn>
            <H_btn size="lg"><H_icon></H_icon>LG</H_btn>
      </div>
</template>
'>
</hhl-live-editor>
<br>

## Icon

You can add a icon by the prop `icon="name"`<br>
You can change the icon position to right by adding the prop `icon-right`

<hhl-live-editor title="" htmlCode='
      <template>
            <div class="flexRow items-center gap-4 flexWrap">
            <H_btn size="sm"><H_icon icon="edit"></H_icon> ICON sm</H_btn>
             <H_btn><H_icon icon="edit"></H_icon>ICON md</H_btn>
            <H_btn size="lg"><H_icon icon="edit"></H_icon>ICON lg</H_btn>
            <H_btn>ICON-RIGHT <H_icon icon="edit"></H_icon></H_btn>
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
            <H_btn disabled>STANDARD</H_btn>
            <H_btn disabled type="outline">OUTLINE</H_btn>
            <H_btn disabled type="text">TEXT</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the prop `color="/pri/sec/ok/err/warn/info/"`<br>
The default is `pri`.<br>

If you need a special color then just use `style="background-color: purple: color: white"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_btn color="pri">Primery</H_btn>
            <H_btn color="sec">Secondary</H_btn>
            <H_btn color="ok">Ok</H_btn>
            <H_btn color="err">Error</H_btn>
            <H_btn color="warn">Warning</H_btn>
            <H_btn color="info">Information</H_btn>
            <H_btn style="background-color: purple; color:white">White</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
