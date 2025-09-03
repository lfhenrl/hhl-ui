# Button

## Size

You can change the size by the `h-font-size` size property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`<br>
If you need a special size then just use `h-font-size: 25px"` or `class="text-3xl"`

<hhl-live-editor title=""  htmlCode='
<template>
      <div  h-display="flex" h-align-items="center" h-flex-wrap="wrap" h-gap="1rem">
            <H_btn h-font-size="xs" ><H_icon name="mail" h-color="red" h-font-size="xl" ></H_icon>XS</H_btn>
            <H_btn h-font-size="sm"><H_icon name="mail"></H_icon>SM</H_btn>
            <H_btn h-font-size="md"><H_icon name="mail"></H_icon>MD (Default)</H_btn>
            <H_btn h-font-size="lg"><H_icon name="mail"></H_icon>LG</H_btn>
            <H_btn h-font-size="xl"><H_icon name="mail"></H_icon>XL</H_btn>
            <H_btn h-font-size="25px"><H_icon name="mail"></H_icon>style</H_btn>
            <H_btn class="text-3xl"><H_icon name="mail"></H_icon>class</H_btn>
      </div>
</template>
'>
</hhl-live-editor>
<br>

## Icon

You can add a icon <br>

<hhl-live-editor title="" htmlCode='
      <template>
            <div h-display="flex" h-align-items="center" h-flex-wrap="wrap" h-gap="1rem">
            <H_btn><H_icon name="mail" h-color="white" h-font-size="1.3em"></H_icon>ICON mail</H_btn>
            <H_btn><H_icon name="save" h-color="var(--col-err)" h-font-size="1.3em"></H_icon>ICON save Red</H_btn>
            <H_btn>icon save right <H_icon name="save" H-color="white" h-font-size="1.3em"></H_icon></H_btn>
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
      <div h-display="flex" h-align-items="center" h-flex-wrap="wrap" h-gap="1rem">
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
      <div h-display="flex" h-align-items="center" h-flex-wrap="wrap" h-gap="1rem">
            <H_btn disabled>STANDARD</H_btn>
            <H_btn disabled type="outline">OUTLINE</H_btn>
            <H_btn disabled type="text">TEXT</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the `h-color` property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "col-0" | "col-1" | "col-2" | "col-3" | "col-4" | "col-5" | "col-6" | "col-7" | "col-8" | "col-9"`. <br>
The default is `var(--col-pri)`.<br>

If you need a special color then just use `h-color="purple"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div h-display="flex" h-align-items="center" h-flex-wrap="wrap" h-gap="1rem">
            <H_btn>PRI</H_btn>
            <H_btn h-color="var(--col-sec)">SEC</H_btn>
            <H_btn h-color="var(--col-ok)">OK</H_btn>
            <H_btn h-color="var(--col-err)">ERR</H_btn>
            <H_btn h-color="var(--col-warn)">Warn</H_btn>
            <H_btn h-color="var(--col-info)">INFO</H_btn>
            <H_btn h-color="white">WHITE</H_btn>
            <H_btn h-color="black">BLACK</H_btn>
            <H_btn h-color="var(--col-0)">col-0</H_btn>
            <H_btn h-color="var(--col-1)">col-1</H_btn>
            <H_btn h-color="var(--col-2)">col-2</H_btn>
            <H_btn h-color="var(--col-3)">col-3</H_btn>
            <H_btn h-color="var(--col-4)">col-4</H_btn>
            <H_btn h-color="var(--col-5)">col-5</H_btn>
            <H_btn h-color="var(--col-6)">col-6</H_btn>
            <H_btn h-color="var(--col-7)">col-7</H_btn>
            <H_btn h-color="var(--col-8)">col-8</H_btn>
            <H_btn h-color="var(--col-9)">col-9</H_btn>
            <H_btn h-color="purple" >purple</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
