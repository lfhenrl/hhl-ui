# Range

## Data binding

Set the min and max properties to how you want scale to be.<br>
here the values are: `min="0"` and `min="100"`

<hhl-live-editor title="" htmlCode=' 
    <template>
    <div h-display="flex" h-flex-direction="column" h-gap="2rem">
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

You can change the color by the `h-color` property `"col-pri" | "col-ok" | "col-sec" | "col-warn" | "col-err" | "col-info" | "white" |  "black" |  "col-0" | "col-1" | "col-2" | "col-3" | "col-4" | "col-5" | "col-6" | "col-7" | "col-8" | "col-9"`. <br>
The default is var(--col-pri)`.<br>
If you need a special color then just use `h-color="purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div h-display="flex" h-flex-direction="column" h-gap="2rem">
        <H_range v-model="value" :min="0" :max="100" label="col-pri" h-color="var(--col-pri)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-sec" h-color="var(--col-sec)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-ok" h-color="var(--col-ok)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-err" h-color="var(--col-err)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-warn" h-color="var(--col-warn)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-info" h-color="var(--col-info)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="white" h-color="white" ></H_range>
        <H_range v-model="value" :min="0" :max="100" label="black" h-color="black" ></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-0" h-color="var(--col-0)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-1" h-color="var(--col-1)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-2" h-color="var(--col-2)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-3" h-color="var(--col-3)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-4" h-color="var(--col-4)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-5" h-color="var(--col-5)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-6" h-color="var(--col-6)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-7" h-color="var(--col-7)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-8" h-color="var(--col-8)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="col-9" h-color="var(--col-9)"></H_range>
        <H_range v-model="value" :min="0" :max="100" label="special color" h-color="purple"></H_range>
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
        <div h-display="flex" h-flex-direction="column" h-gap="2rem">
        <H_range disabled v-model="value" :min="0" :max="100" label="col-pri" h-color="var(--col-pri)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-sec" h-color="var(--col-sec)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-ok" h-color="var(--col-ok)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-err" h-color="var(--col-err)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-warn" h-color="var(--col-warn)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-info" h-color="var(--col-info)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="white" h-color="white"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="black" h-color="black"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-0" h-color="var(--col-0)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-1" h-color="var(--col-1)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-2" h-color="var(--col-2)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-3" h-color="var(--col-3)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-4" h-color="var(--col-4)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-5" h-color="var(--col-5)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-6" h-color="var(--col-6)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-7" h-color="var(--col-7)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-7" h-color="var(--col-8)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="col-7" h-color="var(--col-9)"></H_range>
        <H_range disabled v-model="value" :min="0" :max="100" label="special color" style="--range-color: purple" label="purple"></H_range>
        </div>
    </template>
    <script>
        const value = ref(33);
        return {value}
    </script>
'>
</hhl-live-editor>

<br>
