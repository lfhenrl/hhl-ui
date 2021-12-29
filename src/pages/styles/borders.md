## Border.

By adding 1 of these classes to a dom container, you will get a border.<br>

- `border` - Add border to all sides, 1px solid with current color and radius 4px.
- `border-l` - Add border to the left, 1px solid with current color and radius 4px.
- `border-r` - Add border to the right, 1px solid with current color and radius 4px.
- `border-t` - Add border to the top, 1px solid with current color and radius 4px.
- `border-b` - Add border to the bottom, 1px solid with current color and radius 4px.

<br>

<hhl-live-editor title="Border" htmlCode='
    <template>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border">border</div>
      <div class="border-l">border-l</div>
      <div class="border-r">border-r</div>
      <div class="border-t">border-t</div>
      <div class="border-b">border-b</div>
    </div>
    </template>
    <xstyle>
      div div  {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 5px;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Border width.

<hhl-live-editor title="Border width" htmlCode='
    <template>
    <div class="flx-col gap-12 p-10">
      <div class="flx-row gap-6">
        <div class="border-none">border-none</div>
        <div class="border-0">border-0</div>
        <div class="border">border</div>
        <div class="border-2">border-2</div>
        <div class="border-4">border-4</div>
        <div class="border-8">border-8</div>
      </div>
      <div class="flx-row gap-6">
        <div class="border-l-none">border-l-none</div>
        <div class="border-l-0">border-l-0</div>
        <div class="border-l">border-l</div>
        <div class="border-l-2">border-l-2</div>
        <div class="border-l-4">border-l-4</div>
        <div class="border-l-8">border-l-8</div>
      </div>
      <div class="flx-row gap-6">
        <div class="border-r-none">border-r-none</div>
        <div class="border-r-0">border-r-0</div>
        <div class="border-r">border-r</div>
        <div class="border-r-2">border-r-2</div>
        <div class="border-r-4">border-r-4</div>
        <div class="border-r-8">border-r-8</div>
      </div>
        <div class="flx-row gap-6">
        <div class="border-t-none">border-t-none</div>
        <div class="border-t-0">border-t-0</div>
        <div class="border-t">border-t</div>
        <div class="border-t-2">border-t-2</div>
        <div class="border-t-4">border-t-4</div>
        <div class="border-t-8">border-t-8</div>
      </div>
      <div class="flx-row gap-6">
        <div class="border-b-none">border-b-none</div>
        <div class="border-b-0">border-b-0</div>
        <div class="border-b">border-b</div>
        <div class="border-b-2">border-b-2</div>
        <div class="border-b-4">border-b-4</div>
        <div class="border-b-8">border-b-8</div>
      </div>
    </div>
    </template>
    <xstyle>
      div div div {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 5px;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Border style

<hhl-live-editor title="Border style" htmlCode='
    <template>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border-4 borderStyle-solid">borderStyle-solid</div>
      <div class="border-4 borderStyle-dashed">borderStyle-dashed</div>
      <div class="border-4 borderStyle-dotted">borderStyle-dotted</div>
      <div class="border-4 borderStyle-double">borderStyle-double</div>
    </div>
    </template>
    <xstyle>
      div div  {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 5px;
      }
    </xstyle>
'>
</hhl-live-editor>

<br>

## Border radius

<hhl-live-editor title="Border radius" htmlCode='
    <template>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border borderRadius-0">borderRadius-0</div>
      <div class="border borderRadius-4">borderRadius-4</div>
      <div class="border borderRadius-8">borderRadius-8</div>
      <div class="border borderRadius-12">borderRadius-12</div>
      <div class="border borderRadius-full">borderRadius-full</div>
    </div>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border borderRadius-tl-0">borderRadius-tl-0</div>
      <div class="border borderRadius-tl-4">borderRadius-tl-4</div>
      <div class="border borderRadius-tl-8">borderRadius-tl-8</div>
      <div class="border borderRadius-tl-12">borderRadius-tl-12</div>
      <div class="border borderRadius-tl-full">borderRadius-tl-full</div>
    </div>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border borderRadius-tr-0">borderRadius-tr-0</div>
      <div class="border borderRadius-tr-4">borderRadius-tr-4</div>
      <div class="border borderRadius-tr-8">borderRadius-tr-8</div>
      <div class="border borderRadius-tr-12">borderRadius-tr-12</div>
      <div class="border borderRadius-tr-full">borderRadius-tr-full</div>
    </div>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border borderRadius-br-0">borderRadius-br-0</div>
      <div class="border borderRadius-br-4">borderRadius-br-4</div>
      <div class="border borderRadius-br-8">borderRadius-br-8</div>
      <div class="border borderRadius-br-12">borderRadius-br-12</div>
      <div class="border borderRadius-br-full">borderRadius-br-full</div>
    </div>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border borderRadius-bl-0">borderRadius-bl-0</div>
      <div class="border borderRadius-bl-4">borderRadius-bl-4</div>
      <div class="border borderRadius-bl-8">borderRadius-bl-8</div>
      <div class="border borderRadius-bl-12">borderRadius-bl-12</div>
      <div class="border borderRadius-bl-full">borderRadius-bl-full</div>
    </div>
    </template>
    <xstyle>
      div div  {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 120px;
        font-size: 12px;
      }
    </xstyle>
'>
</hhl-live-editor>

## Border color

<hhl-live-editor title="Border color" htmlCode='
    <template>
    <div class="flx-row flx-wrap gap-6 p-10">
      <div class="border-4 borderColor-comp">borderColor-comp</div>
      <div class="border-4 borderColor-pri">borderColor-pri</div>
      <div class="border-4 borderColor-sec">borderColor-sec</div>
      <div class="border-4 borderColor-ok">borderColor-ok</div>
      <div class="border-4 borderColor-err">borderColor-err</div>
      <div class="border-4 borderColor-warn">borderColor-warn</div>
      <div class="border-4 borderColor-info">borderColor-info</div>
      <div class="border-4 borderColor-black">borderColor-black</div>
      <div class="border-4 borderColor-white">borderColor-white</div>
      <div class="border-4 borderColor-txt-0">borderColor-txt-0</div>
      <div class="border-4 borderColor-txt-1">borderColor-txt-1</div>
      <div class="border-4 borderColor-txt-2">borderColor-txt-2</div>
      <div class="border-4 borderColor-txt-3">borderColor-txt-3</div>
      <div class="border-4 borderColor-txt-4">borderColor-txt-4</div>
      <div class="border-4 borderColor-txt-5">borderColor-txt-5</div>
      <div class="border-4 borderColor-bg-0">borderColor-bg-0</div>
      <div class="border-4 borderColor-bg-1">borderColor-bg-1</div>
      <div class="border-4 borderColor-bg-2">borderColor-bg-2</div>
      <div class="border-4 borderColor-bg-3">borderColor-bg-3</div>
      <div class="border-4 borderColor-bg-4">borderColor-bg-4</div>
      <div class="border-4 borderColor-bg-5">borderColor-bg-5</div>
    </div>
    </template>
    <xstyle>
      div div  {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        width: 150px;
      }
    </xstyle>
'>
</hhl-live-editor>








