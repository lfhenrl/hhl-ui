# Select Box

The `H_selectBox` component is selector box for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap"> 
            <H_selectbox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Label left

By adding attribute "LabelLeft"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 fflex-wrap"> 
            <H_selectbox label-left :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Layout as row

By adding attribute "row"

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap"> 
            <H_selectbox row :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
            <H_input readonly v-model="selection" label="Selector"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with labels

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap">
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
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with multi selections

Multi selections by adding `multi`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap"> 
            <H_selectbox multi
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with labels with multi selection

Multi selections by adding `multi`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap"> 
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
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Disabled

Disabled by adding `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4 flex-wrap"> 
            <H_selectbox disabled
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectbox>
            <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Readonly

Readonly by adding `readonly`

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flex items-center gap-4flex-wrap"> 
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
