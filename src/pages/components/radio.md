# Radio

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_radio label="Radio 1" v-model="radioVal"  value="val1"></H_radio>
        <H_radio label="Radio 2" v-model="radioVal" value="val2" ></H_radio>    
        <H_radio label="Radio 3" v-model="radioVal" value="val3"></H_radio>
        <H_inputText v-model="radioVal" label="value"></H_inputText>
    </div>
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
     <div class="flexRow items-center gap-4 flexWrap">
        <H_radio label="label standard" v-model="radioVal" value="val1"></H_radio>
        <H_radio label-left label="Label left" v-model="radioVal" value="val2"></H_radio>
        <div class="flex-1" />
    </div>
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
    <div class="flexRow items-center gap-4 flexWrap">
        <H_radio size="sm" label="Radio small (sm)" v-model="radioVal" value="val1"></H_radio>
        <H_radio label="Radio standard (md)" v-model="radioVal" value="val2"></H_radio>
        <H_radio size="lg" label="Radio large (lg)" v-model="radioVal" value="val3"></H_radio>
    </div>
    </template>
    <script>
        const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the prop `color="/pri/sec/ok/err/warn/info/"`<br>
The default is `pri`.<br>
If you need a special color then just use `style="--color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_radio color="pri" label="col-pri" v-model="radioVal" value="val11"></H_radio>
        <H_radio color="sec" label="col-sec" v-model="radioVal" value="val11"></H_radio>
        <H_radio color="ok" label="col-ok" v-model="radioVal" value="val11"></H_radio>
        <H_radio color="err" label="col-err" v-model="radioVal" value="val11"></H_radio>
        <H_radio color="warn" label="col-warn" v-model="radioVal" value="val11"></H_radio>
        <H_radio color="info" label="col-info" v-model="radioVal" value="val11"></H_radio>
        <H_radio style="--color: purple" label="purple" v-model="radioVal" value="val11"></H_radio>
    </div>
    </template>
    <script>
        const radioVal = ref("val11");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_radio disabled color="pri" label="col-pri" v-model="radioVal" value="val2"></H_radio>
        <H_radio disabled color="sec" label="col-sec" v-model="radioVal" value="val2" ></H_radio>
        <H_radio disabled color="ok" label="col-ok" v-model="radioVal" value="val2"></H_radio>
        <H_radio disabled color="err" label="col-err" v-model="radioVal" value="val2"></H_radio>
        <H_radio disabled color="warn" label="col-warn" v-model="radioVal" value="val2"></H_radio>
        <H_radio disabled color="info" label="col-info" v-model="radioVal" value="val2"></H_radio>
        <H_radio disabled style="--color: purple" v-model="radioVal" value="val2"></H_radio>
    </div>
    </template>
    <script>
        const radioVal = ref("val2");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>
