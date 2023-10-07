# Select

The `H_select` component is dropdown selector for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 px-4">
      <H_select
            :list="[`nr1`, `nr2`, `nr3`]" 
            v-model="selection" label="Selector">
      </H_select>
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
      <div class="flex items-center gap-4 px-4"> 
            <H_select 
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_select>
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
      <div class="flex items-center gap-4 px-4"> 
            <H_select multi
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
      <div class="flex items-center gap-4 px-4"> 
            <H_select multi
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_select>
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

## Hide filter

Hide filter by adding `hide-filter`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 px-4"> 
            <H_select hide-filter
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
      <div class="flex items-center gap-4 px-4"> 
            <H_select disabled
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
      <div class="flex items-center gap-4 px-4"> 
            <H_select readonly
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
