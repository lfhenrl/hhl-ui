# Radio

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex>
        <H_radio label="Radio 1" v-model="radioVal" value="val1"></H_radio>
        <H_radio label="Radio 2" v-model="radioVal" value="val2"></H_radio>    
        <H_radio label="Radio 3" v-model="radioVal" value="val3"></H_radio>
        <H_input v-model="radioVal" label="value"></H_input>
    </H_flex>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Label

You can change the label position to left by adding the prop `label-left`

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex>
        <H_radio label="label standard" v-model="radioVal" value="val1"></H_radio>
        <H_radio label-left label="Label left" v-model="radioVal" value="val2"></H_radio>
        <H_spacer/>
    </H_flex>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Size

You can change the size by the prop `size="/sm/md/lg"`<br>
The default is `"md"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex>
        <H_radio size="sm" label="Radio small (sm)" v-model="radioVal" value="val1"></H_radio>
        <H_radio label="Radio standard (md)" v-model="radioVal" value="val2"></H_radio>
        <H_radio size="lg" label="Radio large (lg)" v-model="radioVal" value="val3"></H_radio>
    </H_flex>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by adding one of the theme color classes<br>
`col-pri` `col-sec` `col-ok` `col-err` `col-warn` `col-info` `col-black` `col-white`<br>
The default is `col-pri`.<br>
If you need a special color then just use `style="--current-bg-col: purple: color: white"`

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex>
        <H_radio class="col-pri" label="col-pri" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-sec" label="col-sec" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-ok" label="col-ok" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-err" label="col-err" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-warn" label="col-warn" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-info" label="col-info" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-black" label="col-black" v-model="radioVal" value="val1"></H_radio>
        <H_radio class="col-white" label="col-white" v-model="radioVal" value="val1"></H_radio>
        <H_radio style="--current-bg-col: purple; color: white" label="purple" v-model="radioVal" value="val1"></H_radio>
    </H_flex>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
    <template>
    <H_flex>
        <H_radio disabled class="col-pri" label="col-pri" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-sec" label="col-sec" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-ok" label="col-ok" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-err" label="col-err" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-warn" label="col-warn" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-info" label="col-info" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-black" label="col-black" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled class="col-white" label="col-white" v-model="radioVal" value="val1"></H_radio>
        <H_radio disabled style="--current-bg-col: purple; color: white" label="purple" v-model="radioVal" value="val1"></H_radio>
    </H_flex>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>
