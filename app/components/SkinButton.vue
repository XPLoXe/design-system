<script setup lang="ts">
const { isCyberpunk, enabled, toggle } = useSkin()

const label = computed(() => isCyberpunk.value ? 'Turn off cyberpunk mode' : 'Turn on cyberpunk mode')
</script>

<template>
  <UTooltip
    v-if="enabled"
    :text="label"
  >
    <UButton
      icon="i-lucide-cpu"
      :color="isCyberpunk ? 'secondary' : 'neutral'"
      :variant="isCyberpunk ? 'subtle' : 'ghost'"
      :aria-label="label"
      :aria-pressed="isCyberpunk"
      @click="toggle"
    />
  </UTooltip>
</template>
