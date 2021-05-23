
# Icon

## Size

You can change the size by the prop  `size=""`<br>
The default is `"24px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
        <hhl-icon icon="edit" size="14px"></hhl-icon>
        <hhl-icon icon="edit"></hhl-icon>
        <hhl-icon icon="edit" size="44px"></hhl-icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Button effect on hover

If you add the prop `btn` you will get a hover effect-

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
        <hhl-icon btn icon="edit" size="14px"></hhl-icon>
        <hhl-icon btn icon="edit"></hhl-icon>
        <hhl-icon btn icon="edit" size="44px"></hhl-icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color
You can change the color by adding one of the theme color classes<br>
`col-txt-pri` `col-txt-sec` `col-txt-ok` `col-txt-err` `col-txt-warn` `col-txt-info` `col-txt-black` `col-txt-white`<br>
The default is `currentcolor`.<br>
If you need a special color then just use `style="color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
        <hhl-icon icon="edit" class="col-txt-pri"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-sec"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-ok"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-err"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-warn"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-info"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-black"></hhl-icon>
        <hhl-icon icon="edit" class="col-txt-white"></hhl-icon>
        <hhl-icon icon="edit" style="color: purple"></hhl-icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<icon-list/>