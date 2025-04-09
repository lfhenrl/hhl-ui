<template>
  <transition
    mode="out-in"
    enter-from-class="translate-x-[-50%] opacity-0 absolute"
    leave-to-class="translate-x-[50%] opacity-0 absolute"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
  >
    <div v-if="v_ifSelected" v-show="selected" class="H_tab">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, inject, watch, ref } from "vue";

const props = defineProps({
  label: { default: "???", type: String },
  name: { default: "???", type: String },
  icon: { default: "", type: String },
  tab_class: { default: "", type: String },
  keepAlive: { default: false, type: Boolean },
  selected: { default: false, type: Boolean },
  disabled: { type: Boolean, default: false },
});

watch(
  () => props.tab_class,
  () => tabData.changed()
);

//let haveBeenShowed = false;
const tabData: any = inject("tabData");
const selected = computed(() => tabData.selected.value === props.name);

watch(selected, (v) => {
  if (v === true) {
    setTimeout(() => {
      if (props.keepAlive) {
        keepA.value = true;
      }
    }, 5);
  }
});

const keepA = ref(false);

const v_ifSelected = computed(() => selected.value || keepA.value);
</script>
<style>
@layer components {
  .H_tab {
    display: grid;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    grid-template-columns: repeat(1, minmax(0, 1fr));
    height: 100%;
  }
}
</style>
