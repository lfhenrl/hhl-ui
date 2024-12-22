<template>
  <transition
    mode="out-in"
    enter-from-class="translate-x-[-50%] opacity-0 absolute"
    leave-to-class="translate-x-[50%] opacity-0 absolute"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
  >
    <div v-if="selected || keepAlive" v-show="selected" class="H_tab grid grid-rows-1 grid-cols-1 h-full">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, inject, watch } from "vue";

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

const tabData: any = inject("tabData");
const selected = computed(() => tabData.selected.value === props.name);
</script>
