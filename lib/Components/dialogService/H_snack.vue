<template>
  <transition
    @after-leave="$emit('close')"
    enter-from-class="translate-x-[150%] opacity-0 "
    enter-active-class="transition duration-400 ease-in"
    leave-to-class="translate-x-[150%] opacity-0"
    leave-active-class="transition duration-500 ease-out"
  >
    <div
      v-show="modelValue"
      class="H_snack"
      :class="{
        'col-err': type === 'err',
        'col-warn': type === 'warn',
        'col-ok': type === 'info',
      }"
      @click="$emit('update:modelValue', false)"
    >
      <H_icon name="check" size="2rem" color="white" v-if="type === 'info'" />
      <H_icon name="info" size="2rem" :color="type === 'warn' ? 'black' : 'white'" v-else />
      <div class="H_snack-info flex flex-col items-center flex-1">
        <span class="text-lg font-bold">{{ title }}</span>
        <span class="H_snack__text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import H_icon from "../H_icon.vue";
defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  type: { default: "warn", type: String },
  title: { default: "Title", type: String },
  text: { default: "Title", type: String },
});

const emit = defineEmits(["show", "close", "update:modelValue"]);

function close() {
  emit("show", false);
}
defineExpose({ close });
</script>
<style>
@layer components {
  .H_snack {
    display: flex;
    position: fixed;
    padding-top: 0.375rem;
    padding-bottom: 0.75rem;
    padding-left: 0.75rem;
    border-radius: 0.25rem;
    right: 1.25rem;
    top: 1.25rem;
    width: 20rem;
    max-width: 20rem;
    z-index: 500;
  }
}
</style>
