<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem } from '@nuxt/ui'

useSeoMeta({ title: 'Design system' })

const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const variants: ButtonProps['variant'][] = ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link']
const sizes: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']

const textTokens = ['dimmed', 'muted', 'toned', 'default', 'highlighted'] as const
const bgTokens = ['default', 'muted', 'elevated', 'accented', 'inverted'] as const

const { apps } = useApps()

const userMenu: DropdownMenuItem[][] = [
  [{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }],
  [{ label: 'Sign out', icon: 'i-lucide-log-out' }],
]

function cssVar(name: string) {
  return { background: `var(${name})` }
}
</script>

<template>
  <UContainer class="space-y-16 py-12">
    <UPageHeader
      title="Design system"
      description="Theme tokens and shared components provided by @alebocchicchio/layer."
    />

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        Colors
      </h2>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        <div
          v-for="color in colors"
          :key="color"
          class="space-y-2"
        >
          <div
            class="h-16 rounded-(--ui-radius) border border-default"
            :style="cssVar(`--ui-${color === 'neutral' ? 'bg-inverted' : color}`)"
          />
          <p class="text-sm font-medium">
            {{ color }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="color in colors"
          :key="color"
          class="flex items-center gap-3"
        >
          <span class="w-20 shrink-0 text-sm text-muted">{{ color }}</span>
          <div class="grid flex-1 grid-cols-11 gap-1">
            <UTooltip
              v-for="shade in shades"
              :key="shade"
              :text="`--ui-color-${color}-${shade}`"
            >
              <div
                class="h-8 rounded-sm"
                :style="cssVar(`--ui-color-${color}-${shade}`)"
              />
            </UTooltip>
          </div>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <UCard>
          <template #header>
            <h3 class="font-semibold">
              Text
            </h3>
          </template>
          <ul class="space-y-1">
            <li
              v-for="token in textTokens"
              :key="token"
              :style="{ color: `var(--ui-text${token === 'default' ? '' : `-${token}`})` }"
            >
              --ui-text{{ token === 'default' ? '' : `-${token}` }}
            </li>
          </ul>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              Background
            </h3>
          </template>
          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="token in bgTokens"
              :key="token"
              class="space-y-1"
            >
              <div
                class="h-10 rounded-(--ui-radius) border border-default"
                :style="cssVar(`--ui-bg${token === 'default' ? '' : `-${token}`}`)"
              />
              <p class="text-xs text-muted">
                {{ token }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        Typography &amp; radius
      </h2>

      <UCard>
        <p class="text-4xl font-bold text-highlighted">
          The quick brown fox
        </p>
        <p class="mt-2 text-muted">
          Sans: Inter. Body copy uses <code class="font-mono text-sm">--font-sans</code>; code uses
          <code class="font-mono text-sm">--font-mono</code>. Base radius is
          <code class="font-mono text-sm">--ui-radius</code>.
        </p>
      </UCard>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        Buttons
      </h2>

      <div class="overflow-x-auto">
        <table class="text-sm">
          <thead>
            <tr>
              <th />
              <th
                v-for="variant in variants"
                :key="variant"
                class="px-3 pb-3 text-left font-medium text-muted"
              >
                {{ variant }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="color in colors"
              :key="color"
            >
              <td class="pr-3 text-muted">
                {{ color }}
              </td>
              <td
                v-for="variant in variants"
                :key="variant"
                class="px-3 py-1.5"
              >
                <UButton
                  :color="color"
                  :variant="variant"
                  label="Button"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <UButton
          v-for="size in sizes"
          :key="size"
          :size="size"
          :label="`Size ${size}`"
          icon="i-lucide-sparkles"
        />
        <UButton
          label="Loading"
          loading
        />
        <UButton
          label="Disabled"
          disabled
        />
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        Navbar
      </h2>

      <div
        v-for="app in apps.filter(a => a.status !== 'soon')"
        :key="app.id"
        class="space-y-2"
      >
        <p class="text-sm text-muted">
          <code class="font-mono">&lt;AleNavbar current="{{ app.id }}" /&gt;</code>
        </p>
        <div class="overflow-hidden rounded-(--ui-radius) border border-default">
          <AleNavbar
            :current="app.id"
            class="static"
          />
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-muted">
          With the <code class="font-mono">#right</code> slot (app-specific user menu)
        </p>
        <div class="overflow-hidden rounded-(--ui-radius) border border-default">
          <AleNavbar
            current="spendy"
            class="static"
          >
            <template #right>
              <UDropdownMenu :items="userMenu">
                <UButton
                  color="neutral"
                  variant="ghost"
                  aria-label="User menu"
                >
                  <UAvatar
                    alt="Ale Bocchicchio"
                    size="xs"
                  />
                </UButton>
              </UDropdownMenu>
            </template>
          </AleNavbar>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-highlighted">
        Footer
      </h2>

      <div class="overflow-hidden rounded-(--ui-radius) border border-default">
        <AleFooter />
      </div>
    </section>
  </UContainer>
</template>
