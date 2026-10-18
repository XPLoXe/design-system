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

const homeUrl = computed(() => apps.value.find(app => app.id === 'landing')?.url ?? '/')

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
    <UNavigationMenu :items="items" />

    <template #right>
      <slot name="right" />
      <UColorModeButton />
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
