
# Icon

## Size

You can change the size by the prop  `size=""`<br>
The default is `"24px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap flx-initial flx-align-center flx-justify-start gap-6 p-10">
        <H_icon icon="edit" size="14px"></H_icon>
        <H_icon icon="edit"></H_icon>
        <H_icon icon="edit" size="44px"></H_icon>
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
        <H_icon btn icon="edit" size="14px"></H_icon>
        <H_icon btn icon="edit"></H_icon>
        <H_icon btn icon="edit" size="44px"></H_icon>
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
        <H_icon icon="edit" class="col-txt-pri"></H_icon>
        <H_icon icon="edit" class="col-txt-sec"></H_icon>
        <H_icon icon="edit" class="col-txt-ok"></H_icon>
        <H_icon icon="edit" class="col-txt-err"></H_icon>
        <H_icon icon="edit" class="col-txt-warn"></H_icon>
        <H_icon icon="edit" class="col-txt-info"></H_icon>
        <H_icon icon="edit" class="col-txt-black"></H_icon>
        <H_icon icon="edit" class="col-txt-white"></H_icon>
        <H_icon icon="edit" style="color: purple"></H_icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<icon-list/>