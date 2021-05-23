
# Button

## Size
You can change the size by the prop  `size="/sm/md/lg"`<br>
The default is `"md"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <hhl-btn size="sm">SM</hhl-btn>
            <hhl-btn size="md">MD</hhl-btn>
            <hhl-btn size="lg">LG</hhl-btn>
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
            <hhl-btn icon="edit">ICON</hhl-btn>
            <hhl-btn icon-right icon="edit">ICON-RIGHT</hhl-btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Type
You can change the type by the prop  `type="/standard/outline/text/icon/icon-outline/icon-text"`<br>
The default is `"standard"`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
            <hhl-btn type="standard" icon="mail">STANDARD</hhl-btn>
            <hhl-btn type="outline" icon="mail">OUTLINE</hhl-btn>
            <hhl-btn type="text" icon="mail">TEXT</hhl-btn>
            <hhl-btn type="icon" icon="mail"></hhl-btn>
            <hhl-btn type="icon-outline" icon="mail"></hhl-btn>
            <hhl-btn type="icon-text" icon="mail"></hhl-btn>
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
            <hhl-btn class="borderRadius-full" type="standard" icon="mail">STANDARD</hhl-btn>
            <hhl-btn class="borderRadius-full" type="outline" icon="mail">OUTLINE</hhl-btn>
            <hhl-btn class="borderRadius-full" type="text" icon="mail">TEXT</hhl-btn>
            <hhl-btn class="borderRadius-full" type="icon" icon="mail"></hhl-btn>
            <hhl-btn class="borderRadius-full" type="icon-outline" icon="mail"></hhl-btn>
            <hhl-btn class="borderRadius-full" type="icon-text" icon="mail"></hhl-btn>
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
            <hhl-btn class="shadow-2" type="standard" icon="mail">STANDARD</hhl-btn>
            <hhl-btn class="shadow-2" type="outline" icon="mail">OUTLINE</hhl-btn>
            <hhl-btn class="shadow-2" type="text" icon="mail">TEXT</hhl-btn>
            <hhl-btn class="shadow-2" type="icon" icon="mail"></hhl-btn>
            <hhl-btn class="shadow-2" type="icon-outline" icon="mail"></hhl-btn>
            <hhl-btn class="shadow-2" type="icon-text" icon="mail"></hhl-btn>
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
            <hhl-btn disabled type="standard" icon="mail">STANDARD</hhl-btn>
            <hhl-btn disabled type="outline" icon="mail">OUTLINE</hhl-btn>
            <hhl-btn disabled type="text" icon="mail">TEXT</hhl-btn>
            <hhl-btn disabled class="borderRadius-full" type="icon" icon="mail"></hhl-btn>
            <hhl-btn disabled class="borderRadius-full" type="icon-outline" icon="mail"></hhl-btn>
            <hhl-btn disabled class="borderRadius-full" type="icon-text" icon="mail"></hhl-btn>
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
            <hhl-btn class="col-pri">Primery</hhl-btn>
            <hhl-btn class="col-sec">Secondary</hhl-btn>
            <hhl-btn class="col-ok">Ok</hhl-btn>
            <hhl-btn class="col-err">Error</hhl-btn>
            <hhl-btn class="col-warn">Warning</hhl-btn>
            <hhl-btn class="col-info">Information</hhl-btn>
            <hhl-btn class="col-black">Black</hhl-btn>
            <hhl-btn class="col-white">White</hhl-btn>
            <hhl-btn style="background-color: purple">White</hhl-btn>
      </div>
      </template>
'>
</hhl-live-editor>

<br>