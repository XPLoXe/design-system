export default defineAppConfig({
  // Site-level defaults. Apps override these in their own `app.config.ts`.
  site: {
    name: 'Ale Bocchicchio',
    // Id of the current app in `useApps()`, highlighted in the navbar.
    appId: '',
    footerText: 'Built with Nuxt UI.',
    // Root domain; the skin cookie is shared across its subdomains.
    domain: 'alebocchicchio.com',
    // Show the cyberpunk mode toggle in the navbar.
    cyberpunk: true,
  },

  ui: {
    colors: {
      // `brand` is defined in assets/css/main.css.
      primary: 'brand',
      neutral: 'zinc',
    },

    // `ale-*` classes are hooks for the cyberpunk skin (assets/css/cyberpunk.css).
    // They carry no styles of their own. If an app overrides one of these slots
    // in its app.config, it must keep the hook class for the skin to apply.
    button: {
      slots: { base: 'ale-btn' },
      variants: {
        color: { primary: 'ale-c-primary' },
        square: { true: 'ale-square' },
        variant: {
          solid: 'ale-v-solid',
          outline: 'ale-v-outline',
          soft: 'ale-v-soft',
          subtle: 'ale-v-subtle',
          ghost: 'ale-v-ghost',
          link: 'ale-v-link',
        },
      },
    },
    badge: {
      slots: { base: 'ale-badge' },
      variants: { variant: { solid: 'ale-v-solid' } },
    },
    card: {
      slots: { root: 'ale-card', title: 'ale-card-title' },
    },
    alert: {
      slots: { root: 'ale-alert', title: 'ale-alert-title' },
    },
    toast: {
      slots: { root: 'ale-toast', title: 'ale-toast-title', icon: 'ale-toast-icon' },
    },
    progress: {
      slots: { base: 'ale-progress', indicator: 'ale-progress-indicator' },
    },
    formField: {
      slots: { label: 'ale-label' },
    },
    // Boxed field look only for bordered variants; `none`/`ghost` inputs
    // (e.g. the search box inside USelectMenu) stay untouched.
    input: {
      slots: { leadingIcon: 'ale-field-icon', trailingIcon: 'ale-field-icon' },
      variants: { variant: { outline: 'ale-field', subtle: 'ale-field' } },
    },
    textarea: {
      variants: { variant: { outline: 'ale-field', subtle: 'ale-field' } },
    },
    select: {
      slots: { trailingIcon: 'ale-field-icon', content: 'ale-menu', item: 'ale-option', itemTrailingIcon: 'ale-option-check' },
      variants: { variant: { outline: 'ale-field', subtle: 'ale-field' } },
    },
    selectMenu: {
      slots: { trailingIcon: 'ale-field-icon', content: 'ale-menu', item: 'ale-option', itemTrailingIcon: 'ale-option-check' },
      variants: { variant: { outline: 'ale-field', subtle: 'ale-field' } },
    },
    dropdownMenu: {
      slots: { content: 'ale-menu', item: 'ale-option' },
    },
    checkbox: {
      slots: { base: 'ale-checkbox', indicator: 'ale-checkbox-indicator', label: 'ale-check-label' },
    },
    switch: {
      slots: { base: 'ale-switch', thumb: 'ale-switch-thumb', label: 'ale-check-label' },
    },
    tooltip: {
      slots: { content: 'ale-tooltip' },
    },
    modal: {
      slots: { content: 'ale-modal' },
    },
    header: {
      slots: { root: 'ale-header', title: 'ale-header-title', right: 'ale-header-right', body: 'ale-header-body' },
    },
    navigationMenu: {
      slots: { root: 'ale-nav', link: 'ale-nav-link' },
    },
    footer: {
      slots: { root: 'ale-footer' },
    },
    banner: {
      slots: { root: 'ale-banner', center: 'ale-banner-center', title: 'ale-banner-title' },
    },
  },
})

declare module 'nuxt/schema' {
  interface AppConfigInput {
    site?: {
      /** Brand name shown in the navbar and footer. */
      name?: string
      /** Id of the current app in `useApps()`, highlighted in the navbar. */
      appId?: string
      /** Text shown in the footer after the copyright line. */
      footerText?: string
      /** Root domain; the skin cookie is shared across its subdomains. */
      domain?: string
      /** Show the cyberpunk mode toggle in the navbar. Defaults to `true`. */
      cyberpunk?: boolean
    }
  }
}
