# Checkbox

## Data binding Boolean

<hhl-live-editor title="" htmlCode=' 
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_checkbox label="CheckBox 1" v-model="check"></H_checkbox>
        <H_checkbox label="CheckBox 2" v-model="check"></H_checkbox>    
        <H_checkbox label="CheckBox 3" v-model="check"></H_checkbox>
        <H_inputText :model-value="check ? `true` : `false`" label="value"></H_inputText>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Label

You can change the label position to left by adding the prop `label-left`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_checkbox label="label standard" v-model="check"></H_checkbox>
        <H_checkbox label-left label="Label left" :value="check"></H_checkbox>  
        <div class="flex-1" /> 
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

You can change the size by the prop `size="/sm/md/lg"`<br>
The default is `"md"`.

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_checkbox size="sm" label="CheckBox small (sm)" v-model="check"></H_checkbox>
        <H_checkbox size="md"  label="CheckBox standard (md)" v-model="check"></H_checkbox>    
        <H_checkbox size="lg" label="CheckBox large (lg)" v-model="check"></H_checkbox>
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

You can change the color by the prop `color="/pri/sec/ok/err/warn/info/"`<br>
The default is `pri`.<br>
If you need a special color then just use `style="--color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flexRow items-center gap-4 flexWrap">
        <H_checkbox color="pri" label="col-pri" v-model="check"></H_checkbox>
        <H_checkbox color="sec" label="col-sec" v-model="check"></H_checkbox>    
        <H_checkbox color="ok" label="col-ok" v-model="check"></H_checkbox>
        <H_checkbox color="err" label="col-err" v-model="check"></H_checkbox>
        <H_checkbox color="warn" label="col-warn" v-model="check"></H_checkbox>
        <H_checkbox color="info" label="col-info" v-model="check"></H_checkbox>
        <H_checkbox style="--color: purple;" label="purple" v-model="check"></H_checkbox>
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
         <div class="flexRow items-center gap-4 flexWrap">
            <H_checkbox disabled color="pri" label="col-pri" v-model="check"></H_checkbox>
            <H_checkbox disabled color="sec" label="col-sec" v-model="check"></H_checkbox>    
            <H_checkbox disabled color="ok" label="col-ok" v-model="check"></H_checkbox>
            <H_checkbox disabled color="err" label="col-err" v-model="check"></H_checkbox>
            <H_checkbox disabled color="warn" label="col-warn" v-model="check"></H_checkbox>
            <H_checkbox disabled color="info" label="col-info" v-model="check"></H_checkbox>
            <H_checkbox disabled style="--color: purple;" label="purple" v-model="check"></H_checkbox>
        </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>
