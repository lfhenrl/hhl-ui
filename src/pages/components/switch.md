# Switch

## Data binding Boolean

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flexRow items-center gap-4 flexWrap">
        <H_switch label="Switch 1" v-model="check"></H_switch>
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

You can change the color by adding one of the theme color classes<br>
`col-pri` `col-sec` `col-ok` `col-err` `col-warn` `col-info` `col-black` `col-white`<br>
The default is `col-pri`.<br>
If you need a special color then just use `style="--current-bg-col: purple: color: white"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flexRow items-center gap-4 flexWrap">
        <H_switch class="col-pri" label="col-pri" v-model="check"></H_switch>
        <H_switch class="col-sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch class="col-ok" label="col-ok" v-model="check"></H_switch>
        <H_switch class="col-err" label="col-err" v-model="check"></H_switch>
        <H_switch class="col-warn" label="col-warn" v-model="check"></H_switch>
        <H_switch class="col-info" label="col-info" v-model="check"></H_switch>
        <H_switch class="col-black" label="col-black" v-model="check"></H_switch>
        <H_switch class="col-white" label="col-white" v-model="check"></H_switch>
        <H_switch style="--current-bg-col: purple; color: white" label="purple" v-model="check"></H_switch>
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
            <H_switch disabled class="col-pri" label="col-pri" v-model="check"></H_switch>
            <H_switch disabled class="col-sec" label="col-sec" v-model="check"></H_switch>    
            <H_switch disabled class="col-ok" label="col-ok" v-model="check"></H_switch>
            <H_switch disabled class="col-err" label="col-err" v-model="check"></H_switch>
            <H_switch disabled class="col-warn" label="col-warn" v-model="check"></H_switch>
            <H_switch disabled class="col-info" label="col-info" v-model="check"></H_switch>
            <H_switch disabled class="col-black" label="col-black" v-model="check"></H_switch>
            <H_switch disabled class="col-white" label="col-white" v-model="check"></H_switch>
            <H_switch disabled style="--current-bg-col: purple; color: white" label="purple" v-model="check"></H_switch>
        </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>
