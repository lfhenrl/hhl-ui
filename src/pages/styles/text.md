# Headings

<hhl-live-editor title="Headings" htmlCode='
    <template>
      <h1>H1. Heading</h1>
      <h2>H2. Heading</h2>
      <h3>H3. Heading</h3>
      <h4>H4. Heading</h4>
      <h5>H5. Heading</h5>
      <h6>H6. Heading</h6>
    </template>
'>
</hhl-live-editor>
<br>

## Bold and Italic

`<b></b>` tag will give you bold. <br/>
`<i></i>` tag will give you italic.

<hhl-live-editor title="Bold & Italic" htmlCode='
    <template>
      <div>
      <b>This is bold text.</b>  
      <i> This is italic text.</i>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Underline and linethrough

`<u></u>` tag will give you underline. <br/>
`<s></s>` tag will give you line through.

<hhl-live-editor title="Underline & linethrough" htmlCode='
    <template>
      <div>
      <u>This is underline text.</u>
      <s>This is line through text.</s>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Keyboard Input and mark

`<kbd></kbd>` tag will give you keyboard style. <br/>
`<mark></mark>` tag will give you markup style.

<hhl-live-editor title="Keyboard Input & mark" htmlCode='
    <template>
      <div>
      <kbd>This is keyboard style text.</kbd><br/><br/>
      <mark>This is markup style text.</mark>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Code (pre)

`<pre></pre>` tag will give you keyboard style. <br/>

<hhl-live-editor title="Code (pre)" htmlCode='
    <template>
      <div >
      <pre class="p-4">
    var a = ["a", "b", "c"];
    a.forEach(function(entry) {
      console.log(entry);
    });
      </pre>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Wrapping and overflow

By adding the `txt-nowrap` class you will prevent text from wrapping. <br/>
By adding the `txt-truncate` class you will truncate the text with an ellipsis 

<hhl-live-editor title="Wrapping and overflow" htmlCode='
    <template>
      <div>
        <p class="txt-nowrap col-bg-warn" style="width: 8rem;">
        Text overflow the parent.</p>
        <p class="txt-truncate col-bg-warn" style="width: 8rem;">
        Text not overflow the parent.</p>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Alignment

By adding the `txt-left` class, will align text to the left.<br/>
By adding the `txt-center` class, will align text to the center.<br/>
By adding the `txt-right` class, will align text to the right.  

<hhl-live-editor title="Alignment" htmlCode='
    <template>
      <div>
        <p class="txt-left">Left aligned text.</p>
        <p class="txt-center">Center aligned text.</p>
        <p class="txt-right">Right aligned text.</p>
    </div>
    </template>
'>
</hhl-live-editor>
