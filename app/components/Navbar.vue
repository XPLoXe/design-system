<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  /** Id of the active app (from `useApps()`). */
  current?: string
}>()

defineSlots<{
  /** App-specific content on the right, e.g. a user menu. */
  right?: () => unknown
}>()

const appConfig = useAppConfig()
const { apps } = useApps()
const { isCyberpunk } = useSkin()

const homeUrl = computed(() => apps.value.find(app => app.id === 'landing')?.url ?? '/')

// Shown under the title in cyberpunk mode, e.g. SPENDY.ALEBOCCHICCHIO.COM
const currentHost = computed(() => {
  const url = apps.value.find(app => app.id === props.current)?.url
  return url ? new URL(url).host : appConfig.site.domain
})

const items = computed<NavigationMenuItem[]>(() =>
  apps.value.map(app => ({
    label: app.name,
    icon: app.icon,
    to: app.status === 'soon' ? undefined : app.url,
    active: app.id === props.current,
    disabled: app.status === 'soon',
    badge: app.status === 'soon' ? { label: 'Soon', color: 'neutral', variant: 'subtle' } : undefined,
  })),
)
</script>

<template>
  <UHeader
    :title="appConfig.site.name"
    :to="homeUrl"
  >
    <template #title>
      {{ appConfig.site.name }}
      <span class="ale-cp-only ale-header-host">{{ currentHost }}</span>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <slot name="right" />
      <!-- Cyberpunk mode is always dark -->
      <UColorModeButton :disabled="isCyberpunk" />
      <AleSkinButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
