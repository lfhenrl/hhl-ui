# Select

The `H_select` component is dropdown selector for singel selection or multi selections.

## Data binding simple list

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
      <H_select
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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

## Data binding list with labels

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
      <H_select 
      :select-data="[
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
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select multi
            :select-data="[`nr1`, `nr2`, `nr3`]" 
            v-model="selection" label="Selector">
      </H_select>
      <H_input readonly v-model="selection" label="Value"></H_input>
      </div>
      </template>
      <script>
      const selection = ref([]);
      return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Data binding list with labels with multi selection

Multi selections by adding `multi`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
      <H_select multi
      :select-data="[
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
      const selection = ref([]);
      return { selection }
      </script>
'>
</hhl-live-editor>

<br>

## Hide filter

Hide filter by adding `hide-filter`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select hide-filter
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select disabled
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select readonly
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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

## Min Height

Min Height by adding `min-height="value px"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select min-height="500px"
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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

## Max Height

Max Height by adding `max-height="value px"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select max-height="90px"
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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

## Min Width

Min width by adding `min-width="value px"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select min-width="600px"
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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

## Max Width

Max width by adding `max-width="value px"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center"> 
       <H_select max-width="90px"
            :select-data="[`nr1`, `nr2`, `nr3`]" 
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
