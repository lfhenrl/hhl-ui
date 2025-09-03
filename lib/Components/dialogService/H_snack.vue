<template>
  <transition name="snack" @after-leave="$emit('close')">
    <div
      v-show="modelValue"
      class="H_snack"
      h-display="flex"
      h-position="fixed"
      h-padding="0.375rem 0 0.75rem 0.75rem"
      h-border-radius="0.25rem"
      h-right="1.25rem"
      h-top="1.25rem"
      h-width="20rem"
      h-max-width="20rem"
      :type
      @click="$emit('update:modelValue', false)"
    >
      <H_icon name="check" h-font-size="2rem" h-color="black" v-if="type === 'info'" />
      <H_icon name="info" h-font-size="2rem" h-color="black" v-if="type === 'warn'" />
      <H_icon name="info" h-font-size="2rem" h-color="white" v-if="type === 'err'" />

      <div class="H_snack-info" h-display="flex" h-flex-direction="column" h-align-items="center" h-flex="1">
        <div h-font-size="1.125em">{{ title }}</div>
        <span h-font-size="1.125em">{{ text }}</span>
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
    z-index: 500;
    &[type="err"] {
      background-color: var(--col-err);
      color: white;
    }
    &[type="warn"] {
      background-color: var(--col-warn);
      color: black;
    }
    &[type="info"] {
      background-color: var(--col-ok);
      color: black;
    }
    .H_snack-info {
      div {
        font-weight: bold;
      }
    }
  }
}
</style>
