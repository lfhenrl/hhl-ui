<template>
  <transition name="snack" @after-leave="$emit('close')">
    <div v-show="modelValue" class="H_snack" :type @click="$emit('update:modelValue', false)">
      <H_icon name="check" size="2rem" color="white" v-if="type === 'info'" />
      <H_icon name="info" size="2rem" :color="type === 'warn' ? 'black' : 'white'" v-else />
      <div class="H_snack-info">
        <div>{{ title }}</div>
        <span>{{ text }}</span>
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
  .snack-enter-active {
    transition: all 0.5s ease-in;
  }

  .snack-leave-active {
    transition: all 0.5s ease-out;
  }
  .snack-enter-from,
  .snack-leave-to {
    opacity: 0;
    transform: translateX(150%);
  }

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

    &[type="err"] {
      background-color: var(--color-err);
      color: var(--color-errTxt);
    }

    &[type="warn"] {
      background-color: var(--color-warn);
      color: var(--color-warnTxt);
    }

    &[type="info"] {
      background-color: var(--color-ok);
      color: var(--color-okTxt);
    }

    .H_snack-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      div {
        font-size: 1.125em;
        font-weight: bold;
      }
    }
  }
}
</style>
