# Button

## Size

You can change the size by the prop `size="/sm/md/lg"`<br>
The default is `"md"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn size="sm">SM</H_btn>
            <H_btn size="md">MD</H_btn>
            <H_btn size="lg">LG</H_btn>
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
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn icon="edit">ICON</H_btn>
            <H_btn icon-right icon="edit">ICON-RIGHT</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Type

You can change the type by the prop `type="/standard/outline/text/icon/icon-outline/icon-text"`<br>
The default is `"standard"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn type="standard" icon="mail">STANDARD</H_btn>
            <H_btn type="outline" icon="mail">OUTLINE</H_btn>
            <H_btn type="text" icon="mail">TEXT</H_btn>
            <H_btn type="icon" icon="mail"></H_btn>
            <H_btn type="icon-outline" icon="mail"></H_btn>
            <H_btn type="icon-text" icon="mail"></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Rounded

You can make rounded buttons by adding the class `borderRadius-/0/4/8/12/full`
The default is `"borderRadius-full"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn class="borderRadius-full" type="standard" icon="mail">STANDARD</H_btn>
            <H_btn class="borderRadius-full" type="outline" icon="mail">OUTLINE</H_btn>
            <H_btn class="borderRadius-full" type="text" icon="mail">TEXT</H_btn>
            <H_btn class="borderRadius-full" type="icon" icon="mail"></H_btn>
            <H_btn class="borderRadius-full" type="icon-outline" icon="mail"></H_btn>
            <H_btn class="borderRadius-full" type="icon-text" icon="mail"></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Raised

You can make rounded buttons by adding the class `shadow-/1/2/3/4/5`
The default is `"none"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn class="shadow-2" type="standard" icon="mail">STANDARD</H_btn>
            <H_btn class="shadow-2" type="outline" icon="mail">OUTLINE</H_btn>
            <H_btn class="shadow-2" type="text" icon="mail">TEXT</H_btn>
            <H_btn class="shadow-2" type="icon" icon="mail"></H_btn>
            <H_btn class="shadow-2" type="icon-outline" icon="mail"></H_btn>
            <H_btn class="shadow-2" type="icon-text" icon="mail"></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn disabled type="standard" icon="mail">STANDARD</H_btn>
            <H_btn disabled type="outline" icon="mail">OUTLINE</H_btn>
            <H_btn disabled type="text" icon="mail">TEXT</H_btn>
            <H_btn disabled class="borderRadius-full" type="icon" icon="mail"></H_btn>
            <H_btn disabled class="borderRadius-full" type="icon-outline" icon="mail"></H_btn>
            <H_btn disabled class="borderRadius-full" type="icon-text" icon="mail"></H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by adding one of the theme color classes<br>
`col-pri/col-sec/col-ok/col-err/col-warn/col-info/col-black/col-white`<br>
The default is `col-pri`.<br>
If you need a special color then just use `style="background-color: purple: color: white"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <H_btn class="col-pri">Primery</H_btn>
            <H_btn class="col-sec">Secondary</H_btn>
            <H_btn class="col-ok">Ok</H_btn>
            <H_btn class="col-err">Error</H_btn>
            <H_btn class="col-warn">Warning</H_btn>
            <H_btn class="col-info">Information</H_btn>
            <H_btn class="col-black">Black</H_btn>
            <H_btn class="col-white">White</H_btn>
            <H_btn style="background-color: purple">White</H_btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>
