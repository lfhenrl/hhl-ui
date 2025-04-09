# Select

The `H_select` component is dropdown selector for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
      <H_select
            :list="[`nr1`, `nr2`, `nr3`]" 
            v-model="selection" label="Selector">
      </H_select>
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
            <H_select 
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
            </H_select>
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
            <H_select multi
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
            <H_select 
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector" multi>
            </H_select>
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

## Start slot

You can add a Icon or other stoff with the start slot.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap"> 
            <H_select multi
            :list="[
                        {value:`nr1`, label: `Number 1`},
                        {value:`nr2`, label: `Number 2`},
                        {value:`nr3`, label: `Number 3`}
                        ]" 
            v-model="selection" label="Selector">
                <H_icon name="mail"></H_icon>
            </H_select>
            <H_input readonly v-model="selection" label="Value" style="margin-top: 50px"></H_input>
      </div>
      </template>
      <script>
            const selection = ref("");
               function click(e) {
                  alert("Start Icon Clicked");
            }
            return { selection,click }
      </script>
'>
</hhl-live-editor>

<br>

## Show filter

Show filter by adding `showFilter`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap"> 
            <H_select show-filter
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
            <H_select disabled
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
      <div class="flex items-center gap-4 flex-wrap"> 
            <H_select readonly
                  :list="[`nr1`, `nr2`, `nr3`]" 
                  v-model="selection" label="Selector">
            </H_select>
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
