# Slider

## Data binding

Set the min and max properties to how you want scale to be.<br>
here the values are: `min="0"` and `min="100"`

<hhl-live-editor title="" htmlCode=' 
    <template>
    <div class="flexRow items-center gap-4 flexWrap">
        <H_slider v-model="value" min="0" max="100" label="Slider Label" class="col-err"></H_slider>
        <H_inputText type="number" v-model="value" label="Slider value"></H_inputText>
    </div>
    </template>
    <script>
        const value = ref("33");
        return {value}
    </script>
'>
</hhl-live-editor>

<br>

<br>

<br>

## Color

You can change the color by adding one of the theme color classes<br>
`col-pri` `col-sec` `col-ok` `col-err` `col-warn` `col-info` `col-black` `col-white`<br>
The default is `col-pri`.<br>
If you need a special color then just use `style="--current-bg-col: purple: color: white"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flexCol gap-8 flexWrap">
        <H_slider v-model="value" min="0" max="100" label="col-pri" class="col-pri"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-sec" class="col-sec"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-ok" class="col-ok"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-err" class="col-err"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-warn" class="col-warn"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-info" class="col-info"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-black" class="col-black"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-white" class="col-white"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="special color" style="--current-bg-col: purple; color: white" label="purple"></H_slider>
    </div>
    </template>
    <script>
        const value = ref(33);
        return {value}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
    <template>
        <div class="flexCol gap-8 flexWrap">
            <H_slider disabled v-model="value" min="0" max="100" label="col-pri" class="col-pri"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-sec" class="col-sec"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-ok" class="col-ok"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-err" class="col-err"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-warn" class="col-warn"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-info" class="col-info"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-black" class="col-black"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-white" class="col-white"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="special color" style="--current-bg-col: purple; color: white" label="purple"></H_slider>
        </div>
    </template>
    <script>
        const value = ref(33);
        return {value}
    </script>
'>
</hhl-live-editor>

<br>
