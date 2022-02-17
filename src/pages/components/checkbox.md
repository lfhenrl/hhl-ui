
# Checkbox

## Data binding Boolean

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
        <H_checkbox label="CheckBox 1" v-model="check"></H_checkbox>
        <H_checkbox label="CheckBox 2" v-model="check"></H_checkbox>    
        <H_checkbox label="CheckBox 3" v-model="check"></H_checkbox>
        <hhl-input v-model="check" label="value"></hhl-input>
    </div>
    </template>
    <script>
    const check = ref(true);
    return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Data binding Array

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
        <H_checkbox label="CheckBox 1" v-model="checkArray" value="value1"></H_checkbox>
        <H_checkbox label="CheckBox 2" v-model="checkArray" value="value2"></H_checkbox>    
        <H_checkbox label="CheckBox 3" v-model="checkArray" value="value3"></H_checkbox>
        <hhl-input v-model="checkArray" label="value"></hhl-input>
    </div>
    </template>
    <script>
    const  checkArray = ref([]);
    return {checkArray}
    </script>
'>
</hhl-live-editor>

<br>

## Label

You can change the label position to left by adding the prop `label-left`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
        <H_checkbox label="label standard" v-model="check"></H_checkbox>
        <H_checkbox label-left label="Label left" v-model="check"></H_checkbox>    
    </div>
    </template>
    <script>
    const check = ref(true);
    return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Size
You can change the size by the prop  `size=""`<br>
The default is `"20px"`.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
        <H_checkbox size="15px" label="CheckBox 15px" v-model="check"></H_checkbox>
        <H_checkbox label="CheckBox standard" v-model="check"></H_checkbox>    
        <H_checkbox size="40px" label="CheckBox 40px" v-model="check"></H_checkbox>
    </div>
    </template>
    <script>
    const check = ref(true);
    return {check}
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
    <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
        <H_checkbox class="col-pri" label="col-pri" v-model="check"></H_checkbox>
        <H_checkbox class="col-sec" label="col-sec" v-model="check"></H_checkbox>    
        <H_checkbox class="col-ok" label="col-ok" v-model="check"></H_checkbox>
        <H_checkbox class="col-err" label="col-err" v-model="check"></H_checkbox>
        <H_checkbox class="col-warn" label="col-warn" v-model="check"></H_checkbox>
        <H_checkbox class="col-info" label="col-info" v-model="check"></H_checkbox>
        <H_checkbox class="col-black" label="col-black" v-model="check"></H_checkbox>
        <H_checkbox class="col-white" label="col-white" v-model="check"></H_checkbox>
        <H_checkbox style="--current-bg-col: purple; color: white" label="purple" v-model="check"></H_checkbox>
    </div>
    </template>
    <script>
    const check = ref(true);
    return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
    <template>
        <div class="flx-row flx-wrap  flx-align-center flx-justify-start gap-6 p-10">
            <H_checkbox disabled class="col-pri" label="col-pri" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-sec" label="col-sec" v-model="check"></H_checkbox>    
            <H_checkbox disabled class="col-ok" label="col-ok" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-err" label="col-err" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-warn" label="col-warn" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-info" label="col-info" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-black" label="col-black" v-model="check"></H_checkbox>
            <H_checkbox disabled class="col-white" label="col-white" v-model="check"></H_checkbox>
            <H_checkbox disabled style="--current-bg-col: purple; color: white" label="purple" v-model="check"></H_checkbox>
        </div>
    </template>
    <script>
    const check = ref(true);
    return {check}
    </script>
'>
</hhl-live-editor>

<br>