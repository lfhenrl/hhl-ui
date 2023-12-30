# Select Box

The `H_selectBox` component is selector box for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectBox>
            <H_inputText readonly v-model="selection" label="Selector"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox label-left :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectBox>
            <H_inputText readonly v-model="selection" label="Selector"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox row :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectBox>
            <H_inputText readonly v-model="selection" label="Selector"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap">
            <H_selectBox 
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_selectBox>
            <H_inputText readonly v-model="selection" label="Value"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox multi
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectBox>
            <H_inputText readonly v-model="selection" label="Value"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox multi
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_selectBox>
            <H_inputText readonly v-model="selection" label="Value"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox disabled
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectBox>
            <H_inputText readonly v-model="selection" label="Value"></H_inputText>
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
       <div class="flexRow items-center gap-4 flexWrap"> 
            <H_selectBox readonly
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_selectBox>
            <H_inputText readonly v-model="selection" label="Value"></H_inputText>
      </div>
      </template>
      <script>
            const selection = ref("nr2");
            return { selection }
      </script>
'>
</hhl-live-editor>

<br>
