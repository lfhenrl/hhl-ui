# Range

## Data binding

Set the min and max properties to how you want scale to be.<br>
here the values are: `min="0"` and `min="100"`

<hhl-live-editor title="" htmlCode=' 
    <template>
    <div class="flex flex-col gap-8">
        <H_range  v-model="value" :min="0" :max="100" label="Slider Label"></H_range>
        <H_input type="number" v-model="value" label="Slider value"></H_input>
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

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>
The default is `pri`.<br>
If you need a special color then just use `style="--range-color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex flex-col gap-8">
        <H_range v-model="value" :min="0" :max="100" label="pri" color="pri" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="sec" color="sec" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="ok" color="ok" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="err" color="err" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="warn" color="warn" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="info" color="info" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="white" color="white" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="black" color="black" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt0" color="txt0" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt1" color="txt1" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt2" color="txt2" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt3" color="txt3" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt4" color="txt4" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt5" color="txt5" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt6" color="txt6" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt7" color="txt7" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt8" color="txt8" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="txt9" color="txt9" class="w-full"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="special color" style="--range-color: purple" label="purple" class="w-full"></H_range>
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
        <div class="flex flex-col gap-8">
        <H_range disabled v-model="value" :min="0" :max="100" label="pri" color="pri" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="sec" color="sec" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="ok" color="ok" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="err" color="err" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="warn" color="warn" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="info" color="info" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="white" color="white" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="black" color="black" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt0" color="txt0" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt1" color="txt1" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt2" color="txt2" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt3" color="txt3" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt4" color="txt4" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt5" color="txt5" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt6" color="txt6" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="txt7" color="txt7" class="w-full"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="special color" style="--range-color: purple" label="purple" class="w-full"></H_range>
        </div>
    </template>
    <script>
        const value = ref(33);
        return {value}
    </script>
'>
</hhl-live-editor>

<br>
