# Select Box

The `H_selectBox` component is selector box for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox autofocus :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Variant = checkbox (Default)

<hhl-live-editor title="" htmlCode='
    <template>
        <div class="flex items-center gap-4">
            <H_selectbox variant="checkbox" :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="checkbox (Default)"></H_selectbox>
            <H_selectbox variant="radio" :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="radio"></H_selectbox>
            <H_selectbox variant="switch" :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="switch"></H_selectbox>
        </div>
    </template>
    <script>
    const selection = ref("nr2");
    return { selection }
    </script>
'>
</hhl-live-editor>

<br>

## Label left

By adding attribute "LabelLeft"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 "> 
            <H_selectbox label-left :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Label gap

By adding attribute "label gap"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" label-gap="22px" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## List gap

By adding attribute "list gap"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" list-gap="2px" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## justify between

By adding attribute "justify-between"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox justify-between :list="[`nr1`, `nr2`, `nr3`]" list-gap="2px" v-model="selection" label="justify-between"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Layout as row

By adding attribute "row"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox  row :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the `h-color` property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>
The default is `pri`.<br>
If you need a special color then just use `h-color="purple"`

<hhl-live-editor title="" htmlCode='
    <template>
            <div class="flex items-center gap-4">
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-pri)" label="pri"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-ok)"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-sec)" label="sec"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-warn)" label="warn"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-err)" label="err"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-info)" label="info"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="black" label="black"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-3)" label="txt3"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="var(--col-6)" label="txt6"></H_selectbox>
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" h-color="purple" label="purple"></H_selectbox>
        </div>
    </template>
    <script>
    const selection = ref("nr2");
    return { selection }
    </script>
'>
</hhl-live-editor>

<br>

## Data binding list with labels

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4">
            <H_selectbox 
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with multi selections

Multi selections by adding `multi`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox multi
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with labels with multi selection

Multi selections by adding `multi`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox multi
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Disabled

Disabled by adding `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox disabled
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Readonly

Readonly by adding `readonly`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4"> 
            <H_selectbox readonly
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>
