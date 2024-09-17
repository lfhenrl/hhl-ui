<template>
  <transition name="alert" @after-leave="$emit('close')">
    <div
      v-show="modelValue"
      class="H_snack shadow"
      :class="{
        'col-err': type === 'err',
        'col-warn': type === 'warn',
        'col-ok': type === 'info',
      }"
      @click="$emit('update:modelValue', false)"
    >
      <H_icon icon="check" size="28px" btn="standard" v-if="type === 'info'" />
      <H_icon icon="info" size="28px" btn="standard" v-else />
      <div class="H_snack-info">
        <span class="H_snack-info-title">{{ title }}</span>
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
.H_snack {
  display: flex;
  position: fixed;
  padding: 6px 6px 12px 6px;
  border-radius: 4px;
  min-width: 330px;
  max-width: 330px;
  width: 330px;
  z-index: 50;
  right: 20px;
  top: 20px;
}

.H_snack-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
}

.H_snack-info-title {
  font-size: 18px;
  font-weight: bold;
}

.alert-leave-active {
  animation: slide-out 0.5s reverse;
}
.alert-enter-active /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-up 0.5s;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  60% {
    opacity: 1;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  60% {
    opacity: 1;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
