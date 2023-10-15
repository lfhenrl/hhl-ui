# Icon

## Size

You can change the size by the prop `size=""`<br>
The default is `"24px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4">
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
    <div class="flex items-center gap-4">
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
`text-pri` `text-sec` `text-ok` `text-err` `text-warn` `text-info` `text-black` `text-white`<br>
The default is `currentcolor`.<br>
If you need a special color then just use `style="color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4">
        <H_icon icon="edit" class="text-pri"></H_icon>
        <H_icon icon="edit" class="text-sec"></H_icon>
        <H_icon icon="edit" class="text-ok"></H_icon>
        <H_icon icon="edit" class="text-err"></H_icon>
        <H_icon icon="edit" class="text-warn"></H_icon>
        <H_icon icon="edit" class="text-info"></H_icon>
        <H_icon icon="edit" class="text-black"></H_icon>
        <H_icon icon="edit" class="text-white"></H_icon>
        <H_icon icon="edit" style="color: purple"></H_icon>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<icon-list/>
<br>
<br>
