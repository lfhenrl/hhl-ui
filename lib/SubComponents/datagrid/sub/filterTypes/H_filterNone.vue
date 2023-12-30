<template>
  <div class="H_filterNone">Filter disabled....</div>
</template>

<script setup lang="ts">
defineProps({
  index: { type: Number, default: 0 },
});
</script>
<style>
@layer hhl-components {
  .H_filterNone {
    text-align: center;
    font-size: 20px;
    padding: 48px;
  }
}
</style>
