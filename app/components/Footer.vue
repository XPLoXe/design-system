<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineSlots<{
  /** App-specific content on the right, e.g. social links. */
  right?: () => unknown
}>()

const appConfig = useAppConfig()
const { apps } = useApps()

const year = new Date().getFullYear()

const items = computed<NavigationMenuItem[]>(() =>
  apps.value
    .filter(app => app.status !== 'soon')
    .map(app => ({ label: app.name, to: app.url })),
)
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ year }} {{ appConfig.site.name }}. {{ appConfig.site.footerText }}
      </p>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <slot name="right" />
    </template>
  </UFooter>
</template>
