<template>
  <div h-display="flex" h-flex-wrap="wrap" h-gap="0.75rem" h-margin-block="1.0rem" h-padding="0.5rem">
    <div
      v-for="(item, index) in Object.keys(icons)"
      :key="index"
      h-display="flex"
      h-flex-direction="column"
      h-align-items="center"
      h-width="10rem"
      h-border="1px solid var(--col-6)"
      h-border-radius="4px"
      h-font-size="1.5rem"
      h-padding="0.5rem"
    >
      <H_icon :name="item as any" size="2rem" />
      <div h-color="var(--col-2)" h-font-size="sm">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icons } from "../../lib/SubComponents/icons/icons";
</script>
