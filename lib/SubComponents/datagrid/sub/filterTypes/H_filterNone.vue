<template>
  <div class="H_filterNone">Filter disabled....</div>
</template>

<script setup lang="ts">
defineProps({
  index: { type: Number, default: 0 }
});
</script>

<style>
.H_filterNone {
  text-align: center;
  padding: 50px 0;
  font-size: 1.5em;
}
</style>
