export default defineAppConfig({
  // Site-level defaults. Apps override these in their own `app.config.ts`.
  site: {
    name: 'Ale Bocchicchio',
    // Id of the current app in `useApps()`, highlighted in the navbar.
    appId: '',
    footerText: 'Built with Nuxt UI.',
  },

  ui: {
    colors: {
      // `brand` is defined in assets/css/main.css.
      primary: 'brand',
      neutral: 'zinc',
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
    }
  }
}
