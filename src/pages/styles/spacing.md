## Margin & Padding system
The helper classes apply __margin__ or __padding__ to an element ranging from 0 to 5. Each size increment was designed to align with common Material Design spacings. These classes can be applied using the following format `{property}{direction}-{size}`.

The __property__ applies the type of spacing:
- `m` - applies __margin__
- `p` - __applies padding__


The __direction__ designates the side the property applies to:
- `t` - applies the spacing for __-top__
- `b` - applies the spacing for __-bottom__
- `l` - applies the spacing for __-left__
- `r` - applies the spacing for __-right__
- `x` - applies the spacing for both __-left__ and __-right__
- `y` - applies the spacing for both __-top__ and __-bottom__
- `blank` - applies the spacing for all sides


The __size__ controls the increment of the property:
- `auto` - sets the spacing to __auto__
- `0` - removes the spacing by setting it to __0__
- `1` - sets the spacing to __1px__
- `2` - sets the spacing to __2px__
- `3` - sets the spacing to __3px__
- `4` - sets the spacing to __4px__
- `5` - sets the spacing to __5px__
- `6` - sets the spacing to __6px__
- `7` - sets the spacing to __7px__
- `8` - sets the spacing to __8px__
- `9` - sets the spacing to __9px__
- `10` - sets the spacing to __10px__
- `11` - sets the spacing to __11px__
- `12` - sets the spacing to __12px__
- `15` - sets the spacing to __15px__
- `20` - sets the spacing to __20px__
- `25` - sets the spacing to __25px__
<br/>

## Examples


<hhl-live-editor title="p-10 + mx-auto" htmlCode='
    <template>
      <div class="padBox p-10">
        <div>
          <div>
            <div class="mx-auto" style="width:100px">Box</div>
          </div>
        </div>
    </div>
    </template>
'>
</hhl-live-editor>

<br/>
<br/>
<br/>
 
<hhl-live-editor title="pl-10 + my-10" htmlCode='
    <template>
      <div class="padBox pl-10">
        <div>
          <div>
            <div class="my-10">Box</div>
          </div>
        </div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>
<br/>
<br/>

<hhl-live-editor title="px10 + ml-10 + mb-20 + mt-5" htmlCode='
    <template>
      <div class="padBox px-10">
        <div>
          <div>
            <div class="ml-10 mb-20 mt-5">Box</div>
          </div>
        </div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

<style>
  .padBox {
    background:#c5e1a5;
  }
  .padBox div {
    background:#ffcc80;
    border: .1pt solid gray;
  }
  .padBox div div {
    background:none;
  }
  .padBox div div div {
    background:white;
    text-align: center;
  }
</style>