# ProgressBar

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex items-center gap-4 px-4">
      <H_switch v-model="show"></H_switch>
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

Just set the height off the component (h-4).
<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex items-center gap-4 px-4">
      <H_progress-bar show class="h-4"></H_progress-bar>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Colors

color_bg: the background-color. <br>
color_fg: the foreground-color.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex items-center gap-4 px-4">
      <H_progress-bar show color_bg="red" color_fg="lime"></H_progress-bar>
      </div>
    </template>
'>
</hhl-live-editor>
