import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['..'],

  // Dev-only tooling; not part of the published layer.
  modules: ['@nuxt/eslint'],

  devtools: { enabled: true },

  compatibilityDate: '2026-10-01',

  eslint: {
    config: {
      // ESLint runs from the repo root, so generate paths relative to it.
      rootDir: resolve('..'),
      stylistic: true,
    },
  },
})
