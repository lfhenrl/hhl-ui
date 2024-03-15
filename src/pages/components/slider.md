# Slider

## Data binding

Set the min and max properties to how you want scale to be.<br>
here the values are: `min="0"` and `min="100"`

<hhl-live-editor title="" htmlCode=' 
    <template>
    <div class="flexRow items-center gap-4 flexWrap">
        <H_slider v-model="value" min="0" max="100" label="Slider Label"></H_slider>
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

You can change the color by the prop `color="/pri/sec/ok/err/warn/info/"`<br>
The default is `pri`.<br>
If you need a special color then just use `style="--bgcolor: purple; color: white"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flexCol gap-8 flexWrap">
        <H_slider v-model="value" min="0" max="100" label="col-pri" color="pri"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-sec" color="sec"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-ok" color="ok"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-err" color="err"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-warn" color="warn"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="col-info" color="info"></H_slider>
        <H_slider v-model="value" min="0" max="100" label="special color" style="--bgcolor: purple; color: white" label="purple"></H_slider>
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
            <H_slider disabled v-model="value" min="0" max="100" label="col-pri" color="pri"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-sec" color="sec"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-ok" color="ok"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-err" color="err"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-warn" color="warn"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="col-info" color="info"></H_slider>
            <H_slider disabled v-model="value" min="0" max="100" label="special color" style="--bgcolor: purple; color: white" label="purple"></H_slider>
        </div>
    </template>
    <script>
        const value = ref(33);
        return {value}
    </script>
'>
</hhl-live-editor>

<br>
