# @xploxe/layer

A shared [Nuxt layer](https://nuxt.com/docs/getting-started/layers) for every app on `*.alebocchicchio.com`. It sits on top of [Nuxt UI](https://ui.nuxt.com) and provides:

- **Theme**: brand `primary` palette, `zinc` neutral, Inter font, base radius.
- **Shell**: `<AleNavbar>` and `<AleFooter>`, built from Nuxt UI primitives, plus a default layout that uses them.
- **Shared config**: an overridable `site` app config (name, current app, footer text) and a `useApps()` registry of all apps.
- **Cyberpunk mode**: an optional second skin inspired by the Cyberpunk 2077 UI, switched from the navbar and remembered across all subdomains.

It is a thin layer over Nuxt UI, not a component library. Use Nuxt UI components (`U*`) directly in apps.

## Usage

Each consuming repo needs an `.npmrc` (the token stays in an env var, never committed):

```ini
@xploxe:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

Set `GH_PACKAGES_TOKEN` to a classic PAT with `read:packages` (in CI, a secret holding it), then:

```bash
pnpm add @xploxe/layer
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@xploxe/layer'],
})
```

The layer registers `@nuxt/ui`, its CSS, and a default `app.vue` (`<UApp>` + `<NuxtLayout>` + `<NuxtPage>`), so the app doesn't need to install or configure Nuxt UI itself. An app's own `app.vue`, layouts, or components with the same name take precedence over the layer's.

### Configure the app

```ts
// app/app.config.ts
export default defineAppConfig({
  site: {
    appId: 'spendy', // highlighted in the navbar; must match an id in useApps()
    footerText: 'Track every peso.',
  },
  // Any Nuxt UI theme override works here too, e.g.
  // ui: { colors: { primary: 'emerald' } },
})
```

| Key | Default | Purpose |
| --- | --- | --- |
| `site.name` | `Ale Bocchicchio` | Brand name in the navbar and footer |
| `site.appId` | `''` | Id of the current app in `useApps()` |
| `site.footerText` | `Built with Nuxt UI.` | Text after the footer copyright |
| `site.domain` | `alebocchicchio.com` | Root domain; the skin choice is shared across its subdomains |
| `site.cyberpunk` | `true` | Show the cyberpunk mode toggle; `false` hides it and keeps the default skin |

### Components

| Component | Props | Slots |
| --- | --- | --- |
| `<AleNavbar>` | `current?: string`: id of the active app | `right`: app-specific content, e.g. a user menu (rendered before the color mode button) |
| `<AleFooter>` | none | `right` |
| `<AleSkinButton>` | none | none. The cyberpunk mode toggle; already in the navbar, next to the color mode button |

The default layout renders `<AleNavbar :current="site.appId">`, the page, and `<AleFooter>`. To fill the navbar's `right` slot, override the layout in the app:

```vue
<!-- app/layouts/default.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <AleNavbar :current="appConfig.site.appId">
      <template #right>
        <UserMenu />
      </template>
    </AleNavbar>
    <UMain>
      <slot />
    </UMain>
    <AleFooter />
  </div>
</template>
```

### `useApps()`

Returns `{ apps }`, a read-only ref of `AleApp[]` (`id`, `name`, `url`, `icon?`, `description?`, `status?: 'live' | 'soon'`). The list is hardcoded in [`app/composables/useApps.ts`](app/composables/useApps.ts) for now. It's backed by `useState('ale-apps')`, so it can later be loaded from a manifest without changing the navbar or footer API.

### Cyberpunk mode

The chip button in the navbar switches every Nuxt UI component to a second skin: the CP2077 red/cyan palette, Rajdhani and Orbitron, cut corners, scanlines, and a short glitch when it turns on (skipped for reduced motion). It is always dark, so the color mode button is disabled while it's on; the user's light/dark preference is kept and comes back when they switch off.

- **Persistence**: the choice is stored in an `ale-skin` cookie on `.alebocchicchio.com`, so it follows the user across apps. On other hosts (e.g. `localhost`) the cookie is host-only.
- **No flash**: the server reads the cookie and renders `<html data-skin="cyberpunk">` directly.
- **In code**: `useSkin()` returns `{ skin, isCyberpunk, enabled, setSkin, toggle }`.

How it works: [`app/app.config.ts`](app/app.config.ts) adds `ale-*` hook classes to Nuxt UI components (they carry no styles), and [`app/assets/css/cyberpunk.css`](app/assets/css/cyberpunk.css) styles them under `[data-skin="cyberpunk"]`. If an app overrides one of those slots in its own `app.config.ts` (for example `ui.button.slots.base`), the override replaces the hook, so include the hook class in the new value:

```ts
ui: { button: { slots: { base: 'ale-btn font-bold' } } }
```

Optional helpers for app markup:

| Helper | Effect in cyberpunk mode |
| --- | --- |
| `class="ale-cp-only"` | Element is only shown in cyberpunk mode |
| `class="ale-glitch" data-text="Same text"` | Glitch effect on hover |
| `class="ale-heading"` on a heading wrapper | Trailing rule with yellow dashes |
| `class="ale-featured"` on `UCard` | Yellow HUD corners |
| `class="ale-accent"` on `UBadge` | Yellow badge |
| `data-code="SPND_0001"` on `UCard` | Small decorative code in the top-right corner |

## Develop locally

Requires Node 22.22+ or 24.15+ and pnpm (the version is pinned in `packageManager`; `corepack pnpm` works without a global install).

```bash
pnpm install     # also runs `nuxt prepare playground`
pnpm dev         # playground on http://localhost:3000
```

The [`playground/`](playground/) app extends the layer with `extends: ['..']`, like a consuming app would. Open `/design` to review theme colors, text and background tokens, buttons, the navbar (with and without the `right` slot), and the footer.

| Script | What it does |
| --- | --- |
| `pnpm dev` | Run the playground in dev mode |
| `pnpm build` | Production build of the playground |
| `pnpm lint` / `pnpm lint:fix` | ESLint (`@nuxt/eslint`, config generated into `playground/.nuxt`) |
| `pnpm typecheck` | `vue-tsc` over the playground, including the layer |

Layer files live under `app/` (Nuxt 4 layout). Components in `app/components/` are registered with the `Ale` prefix: `Navbar.vue` becomes `<AleNavbar>`. Paths in `nuxt.config.ts` go through `createResolver(import.meta.url)` because relative paths in a layer's config resolve against the consuming app.

## Try unreleased changes in an app

Point the app's `extends` at a local checkout of this repo instead of the published package:

```ts
// nuxt.config.ts in the consuming app
export default defineNuxtConfig({
  extends: [
    process.env.ALE_LAYER_PATH ?? '@xploxe/layer',
  ],
})
```

```bash
ALE_LAYER_PATH=../design-system pnpm dev
```

Or hardcode `extends: ['../design-system']` while you iterate. Run `pnpm install` in this repo first, because a layer loaded from a path resolves its dependencies (Nuxt UI, Tailwind) from its own `node_modules`. Changes to the layer hot-reload in the app.

## Release

Published to GitHub Packages when a version tag is pushed:

```bash
pnpm version patch   # or minor / major; bumps package.json and creates the vX.Y.Z tag
git push --follow-tags
```

The **Release** workflow publishes with the built-in `GITHUB_TOKEN`, so no secrets are needed. The **CI** workflow runs lint, typecheck, and the playground build on every PR and on pushes to `main`.

## License

[MIT](LICENSE)
