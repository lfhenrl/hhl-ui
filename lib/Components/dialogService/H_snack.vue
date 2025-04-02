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
      class="drop-shadow-lg flex fixed pt-1.5 pr-1.5 pb-3 pl-1.5 rounded right-5 z-[500] top-5 w-80 max-w-80"
      :class="{
        'col-err': type === 'err',
        'col-warn': type === 'warn',
        'col-ok': type === 'info',
      }"
      @click="$emit('update:modelValue', false)"
    >
      <H_iconCheck size="2rem" color="white" v-if="type === 'info'" />
      <H_iconInfo size="2rem" :color="type === 'warn' ? 'black' : 'white'" v-else />
      <div class="H_snack-info flex flex-col items-center flex-1">
        <span class="text-lg font-bold">{{ title }}</span>
        <span class="H_snack__text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
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
