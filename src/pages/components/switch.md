# Switch

## Data binding Boolean

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flexRow items-center gap-4 flexWrap">
        <H_switch label="Switch 1" switch v-model="check"></H_switch>
        <H_switch label="Switch 2" v-model="check"></H_switch>    
        <H_switch label="Switch 3" v-model="check"></H_switch>
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
        <H_switch label="label standard" v-model="check"></H_switch>
        <H_switch label-left label="Label left" v-model="check"></H_switch>  
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
        <H_switch size="sm" label="Switch small (sm)" v-model="check"></H_switch>
        <H_switch size="md"  label="Switch standard (md)" v-model="check"></H_switch>    
        <H_switch size="lg" label="Switch large (lg)" v-model="check"></H_switch>
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
        <H_switch color="pri" label="col-pri" v-model="check"></H_switch>
        <H_switch color="sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch color="ok" label="col-ok" v-model="check"></H_switch>
        <H_switch color="err" label="col-err" v-model="check"></H_switch>
        <H_switch color="warn" label="col-warn" v-model="check"></H_switch>
        <H_switch color="info" label="col-info" v-model="check"></H_switch>
        <H_switch style="--color: purple" label="purple" v-model="check"></H_switch>
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
            <H_switch disabled color="pri" label="col-pri" v-model="check"></H_switch>
            <H_switch disabled color="sec" label="col-sec" v-model="check"></H_switch>    
            <H_switch disabled color="ok" label="col-ok" v-model="check"></H_switch>
            <H_switch disabled color="err" label="col-err" v-model="check"></H_switch>
            <H_switch disabled color="warn" label="col-warn" v-model="check"></H_switch>
            <H_switch disabled color="info" label="col-info" v-model="check"></H_switch>
            <H_switch disabled style="--color: purple" label="purple" v-model="check"></H_switch>
        </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>
