# ProgressBar

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
      <div h-display="flex" h-align-items="center" h-gap="1rem">
      <H_switch v-model="show" label="Show"></H_switch>
      <H_progress-bar :show="show" ></H_progress-bar>
      </div>
    </template>
    <script>
    const show = ref(false);
    return {show}
    </script>
'>
</hhl-live-editor>

<br>

## Size

You can change the size by the `h-font-size` property ` "xs" | "sm" | "md" | "lg" | "xl"``<br>
Default is  `md`If you need a special size then just use`style="--pogress-size: 33px"`
<hhl-live-editor title="" htmlCode='
    <template>
      <div h-display="flex" h-flex-direction="column" h-gap="1rem">
      <div h-display="flex" h-align-items="center" h-flex="1">XS:<H_progress-bar show  h-font-size="xs" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">SM:<H_progress-bar show h-font-size="sm" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">MD:<H_progress-bar show h-font-size="md" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">LG:<H_progress-bar show sh-font-size="lg" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">XL:<H_progress-bar show h-font-size="xl" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">33px:<H_progress-bar show speed="2s" h-font-size="33px" ></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Speed

You can change the speed of the animation by the speed property `speed="1.5s"`<br>
Default is `1s`

<hhl-live-editor title="" htmlCode='
<template>
        <div h-display="flex" h-flex-direction="column" h-gap="1rem">
            <div h-display="flex" h-align-items="center" h-flex="1">0.5s:<H_progress-bar show speed="0.5s"></H_progress-bar></div>
            <div h-display="flex" h-align-items="center" h-flex="1">default:<H_progress-bar show ></H_progress-bar></div>
            <div h-display="flex" h-align-items="center" h-flex="1">2s:<H_progress-bar show speed="2s"></H_progress-bar></div>
            <div h-display="flex" h-align-items="center" h-flex="1">3s:<H_progress-bar show speed="3s"></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Colors

You can change the color by the `h-color` and `h-bgcolor` property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>
The default for `h-color` is `pri` and for `h-bgcolor` it is bg0.<br>
If you need a special color then just use `h-color="purple""`

<hhl-live-editor title="" htmlCode='
    <template>
      <div h-display="flex" h-flex-direction="column" h-gap="1rem">
      <div h-display="flex" h-align-items="center" h-flex="1">PRI:<H_progress-bar show  h-bgcolor="red" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">OK:<H_progress-bar show h-color="var(--col-ok)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">SEC:<H_progress-bar show h-color="var(--col-sec)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">WARN:<H_progress-bar show h-color="var(--col-warn)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">ERR:<H_progress-bar show h-color="var(--col-err)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">INFO:<H_progress-bar show h-color="var(--col-info)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">White:<H_progress-bar show h-color="white" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">BLACK:<H_progress-bar show h-color="black" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT0:<H_progress-bar show h-color="var(--col-0)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT1:<H_progress-bar show h-color="var(--col-1)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT2:<H_progress-bar show h-color="var(--col-2)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT3:<H_progress-bar show h-color="var(--col-3)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT4:<H_progress-bar show h-color="var(--col-4)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT5:<H_progress-bar show h-color="var(--col-5)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT6:<H_progress-bar show h-color="var(--col-6)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT7:<H_progress-bar show h-color="var(--col-7)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT8:<H_progress-bar show h-color="var(--col-8)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">TXT9:<H_progress-bar show h-color="var(--col-9)" speed="2s"></H_progress-bar></div>
      <div h-display="flex" h-align-items="center" h-flex="1">Purple:<H_progress-bar show h-color="purple" h-bgcolor="lime" speed="2s"></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>
