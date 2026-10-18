import { createResolver } from '@nuxt/kit'

// Paths must be absolute: when this layer is consumed from node_modules,
// relative paths in this file would resolve against the consuming app.
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  // Layer components are registered with the `Ale` prefix
  // (e.g. `app/components/Navbar.vue` -> `<AleNavbar>`).
  // Nuxt UI components keep their own `U` prefix.
  components: [
    { path: resolve('./app/components'), prefix: 'Ale' },
  ],

  css: [resolve('./app/assets/css/main.css')],
})
