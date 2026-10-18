<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

useSeoMeta({ title: 'Design system' })

const { isCyberpunk } = useSkin()
const toast = useToast()

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

// Example Spendy data
const stats = [
  { label: 'Transactions', value: '47', icon: 'i-lucide-receipt' },
  { label: 'Avg per day', value: '61.17', icon: 'i-lucide-chart-line' },
  { label: 'Largest', value: '650.00', icon: 'i-lucide-calendar' },
  { label: 'Categories', value: '9', icon: 'i-lucide-tag' },
]

const transactions = [
  { id: 'rent', label: 'Rent', amount: '650.00', icon: 'i-lucide-house' },
  { id: 'supermarket', label: 'Supermarket', amount: '64.20', icon: 'i-lucide-shopping-cart' },
  { id: 'metro', label: 'Metro card top-up', amount: '20.00', icon: 'i-lucide-train-front' },
  { id: 'streaming', label: 'Streaming subscription', amount: '9.99', icon: 'i-lucide-tv' },
  { id: 'coffee', label: 'Coffee', amount: '4.80', icon: 'i-lucide-coffee' },
]
const selectedTransaction = ref('supermarket')
const transactionItems = computed<NavigationMenuItem[]>(() =>
  transactions.map(t => ({
    label: t.label,
    icon: t.icon,
    badge: { label: t.amount, color: 'neutral', variant: 'outline' },
    active: t.id === selectedTransaction.value,
    onSelect: () => { selectedTransaction.value = t.id },
  })),
)

const categories: { label: string, value: string, icon: string }[] = [
  { label: 'Food & drink', value: 'food', icon: 'i-lucide-shopping-cart' },
  { label: 'Housing', value: 'housing', icon: 'i-lucide-house' },
  { label: 'Transport', value: 'transport', icon: 'i-lucide-train-front' },
  { label: 'Subscriptions', value: 'subscriptions', icon: 'i-lucide-tv' },
]
const form = reactive({
  description: 'Supermarket',
  amount: '64.20',
  category: 'food',
  countTowardBudget: true,
  split: false,
  recurring: false,
})

function saveExpense() {
  const category = categories.find(c => c.value === form.category)?.label
  toast.add({
    title: 'Expense saved',
    description: `${form.description}, ${form.amount}, added to ${category}.`,
    icon: 'i-lucide-zap',
  })
}

function cssVar(name: string) {
  return { background: `var(${name})` }
}
</script>

<template>
  <UContainer class="space-y-16 py-12">
    <div class="space-y-3">
      <p class="text-sm font-semibold text-primary">
        Design system<span class="ale-cp-only"> // TRN_ALE_000101</span>
      </p>
      <h1 class="text-4xl font-bold text-highlighted">
        <span
          class="ale-glitch"
          data-text="Design system"
        >Design system</span>
      </h1>
      <p class="max-w-2xl text-muted">
        Theme tokens and shared components provided by @alebocchicchio/layer.
        Use the chip button in the navbar to switch between the default skin and cyberpunk mode.
      </p>
    </div>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Colors
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
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
        <div class="ale-cp-only space-y-2">
          <div
            class="h-16 border border-default"
            :style="cssVar('--ale-yellow')"
          />
          <p class="text-sm font-medium">
            accent
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
        <UCard
          title="Text"
          data-code="TKN_TEXT_05"
        >
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

        <UCard
          title="Background"
          data-code="TKN_BG_05"
        >
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
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Typography
        </h2>
      </div>

      <UCard data-code="TYPE_SPEC_0420">
        <div class="divide-y divide-default">
          <div class="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <span class="text-xs text-dimmed">Heading</span>
            <p class="text-4xl font-bold text-highlighted">
              Monthly overview
            </p>
          </div>
          <div class="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <span class="text-xs text-dimmed">Body</span>
            <p>
              You have spent 64% of this month's budget with nine days left in the cycle.
              {{ isCyberpunk ? 'Rajdhani for reading, Orbitron for decoration.' : 'Inter for everything.' }}
            </p>
          </div>
          <div class="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <span class="text-xs text-dimmed">Data</span>
            <p class="text-3xl font-semibold tabular-nums text-highlighted">
              1 284.50
            </p>
          </div>
          <div class="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <span class="text-xs text-dimmed">Decoration</span>
            <p
              class="text-xs tracking-widest text-dimmed"
              :style="{ fontFamily: 'var(--ale-font-display)' }"
            >
              TRN_SPND_000421 // MODEL LINE 12.12AA
            </p>
          </div>
        </div>
      </UCard>
    </section>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Buttons
        </h2>
      </div>

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
          label="Syncing"
          variant="subtle"
          loading
        />
        <UButton
          label="Disabled"
          disabled
        />
      </div>
    </section>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Panels &amp; data
        </h2>
      </div>

      <div class="grid items-start gap-6 lg:grid-cols-2">
        <UCard
          class="ale-featured"
          data-code="SPND_OVR_2026.10"
        >
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <h3 class="font-semibold text-highlighted">
                Monthly overview
              </h3>
              <UBadge
                label="Oct 2026"
                color="secondary"
                variant="subtle"
              />
            </div>
          </template>

          <div class="space-y-5">
            <div class="flex items-baseline justify-between gap-3">
              <span class="text-3xl font-semibold tabular-nums text-highlighted">64%</span>
              <span class="text-sm tabular-nums text-muted">1 284.50 of 2 000.00 · 9 days left</span>
            </div>
            <UProgress :model-value="64" />
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="flex items-center gap-3"
              >
                <span class="grid size-10 shrink-0 place-items-center rounded-(--ui-radius) bg-primary/10 text-primary">
                  <UIcon
                    :name="stat.icon"
                    class="size-5"
                  />
                </span>
                <div>
                  <p class="text-lg font-semibold tabular-nums text-highlighted">
                    {{ stat.value }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ stat.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <UCard data-code="NC_TXN_DB 0.4.1">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <h3 class="font-semibold text-highlighted">
                Recent transactions
              </h3>
              <UButton
                label="View all"
                variant="link"
                size="sm"
              />
            </div>
          </template>

          <UNavigationMenu
            :items="transactionItems"
            orientation="vertical"
          />
        </UCard>
      </div>
    </section>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Forms
        </h2>
      </div>

      <UCard
        title="New expense"
        data-code="FORM_EXP_NEW"
      >
        <form
          class="space-y-6"
          @submit.prevent="saveExpense"
        >
          <div class="grid gap-4 sm:grid-cols-3">
            <UFormField label="Description">
              <UInput
                v-model="form.description"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Amount">
              <UInput
                v-model="form.amount"
                icon="i-lucide-dollar-sign"
                inputmode="decimal"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Category"
              help="Used for the monthly breakdown."
            >
              <USelect
                v-model="form.category"
                :items="categories"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="flex flex-wrap gap-x-8 gap-y-3">
            <UCheckbox
              v-model="form.countTowardBudget"
              label="Count toward budget"
            />
            <UCheckbox
              v-model="form.split"
              label="Split with roommate"
            />
            <USwitch
              v-model="form.recurring"
              label="Repeat monthly"
            />
          </div>

          <div class="flex justify-end gap-2">
            <UButton
              label="Go back"
              variant="subtle"
            />
            <UButton
              label="Save expense"
              type="submit"
            />
          </div>
        </form>
      </UCard>
    </section>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Feedback
        </h2>
      </div>

      <UBanner
        icon="i-lucide-zap"
        title="Spendy 0.4 is live. Recurring expenses now repeat on their own every month."
        :actions="[{ label: 'See how', trailingIcon: 'i-lucide-arrow-right' }]"
        close
      />

      <div class="space-y-3">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Budget at 64%"
          description="Nine days left in this cycle. At the current pace you will reach the limit on October 27."
        />
        <UAlert
          color="error"
          variant="subtle"
          icon="i-lucide-circle-x"
          title="Sync failed"
          description="Spendy could not reach the server. Check your connection; changes are kept on this device until it reconnects."
        />
        <UAlert
          color="secondary"
          variant="subtle"
          icon="i-lucide-info"
          title="New category rules"
          description="Transactions from the same merchant are now grouped automatically."
        />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="Primary" />
        <UBadge
          label="Live"
          color="secondary"
          variant="subtle"
        />
        <UBadge
          label="Paid"
          color="success"
          variant="subtle"
        />
        <UBadge
          label="Soon"
          color="neutral"
          variant="subtle"
        />
        <UBadge
          label="3 new"
          color="secondary"
        />
        <UBadge
          label="9-day streak"
          color="warning"
          class="ale-accent"
        />
        <UButton
          label="Show toast"
          color="secondary"
          variant="outline"
          size="sm"
          @click="saveExpense"
        />
      </div>
    </section>

    <section class="space-y-6">
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Navbar
        </h2>
      </div>

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
      <div class="ale-heading">
        <h2 class="text-2xl font-semibold text-highlighted">
          Footer
        </h2>
      </div>

      <div class="overflow-hidden rounded-(--ui-radius) border border-default">
        <AleFooter />
      </div>
    </section>
  </UContainer>
</template>
