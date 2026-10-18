# @alebocchicchio/layer

A shared [Nuxt layer](https://nuxt.com/docs/getting-started/layers) for every app on `*.alebocchicchio.com`. It sits on top of [Nuxt UI](https://ui.nuxt.com) and provides:

- **Theme**: brand `primary` palette, `zinc` neutral, Inter font, base radius.
- **Shell**: `<AleNavbar>` and `<AleFooter>`, built from Nuxt UI primitives, plus a default layout that uses them.
- **Shared config**: an overridable `site` app config (name, current app, footer text) and a `useApps()` registry of all apps.

It is a thin layer over Nuxt UI, not a component library. Use Nuxt UI components (`U*`) directly in apps.

## Usage

```bash
pnpm add @alebocchicchio/layer
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@alebocchicchio/layer'],
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

### Components

| Component | Props | Slots |
| --- | --- | --- |
| `<AleNavbar>` | `current?: string`: id of the active app | `right`: app-specific content, e.g. a user menu (rendered before the color mode button) |
| `<AleFooter>` | none | `right` |

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

Point the app's `extends` at a local checkout of this repo instead of the npm package:

```ts
// nuxt.config.ts in the consuming app
export default defineNuxtConfig({
  extends: [
    process.env.ALE_LAYER_PATH ?? '@alebocchicchio/layer',
  ],
})
```

```bash
ALE_LAYER_PATH=../design-system pnpm dev
```

Or hardcode `extends: ['../design-system']` while you iterate. Run `pnpm install` in this repo first, because a layer loaded from a path resolves its dependencies (Nuxt UI, Tailwind) from its own `node_modules`. Changes to the layer hot-reload in the app.

## Release

Releases are automated with [Changesets](https://github.com/changesets/changesets).

1. In a PR that changes the layer, run `pnpm changeset`, pick the bump (patch/minor/major), describe the change, and commit the generated `.changeset/*.md` file.
2. When the PR is merged to `main`, the **Release** workflow opens (or updates) a **Version Packages** PR that bumps `package.json` and writes `CHANGELOG.md`.
3. When the Version Packages PR is merged, the workflow publishes the new version to npm (with provenance) and creates a git tag and GitHub release.

The **CI** workflow runs lint, typecheck, and the playground build on every PR and on pushes to `main`.

### One-time setup

- **npm**: the `@alebocchicchio` scope must exist and belong to your npm account (your username, or an org with that name). Create a **granular access token** with read and write access to that scope, set up so publishing from CI doesn't prompt for a 2FA code. npm caps the lifetime of write tokens, so note the expiry date and rotate the secret before then.
- **GitHub secret**: add the token as a repository secret named `NPM_TOKEN` (Settings → Secrets and variables → Actions).
- **GitHub Actions permissions**: Settings → Actions → General → Workflow permissions: enable **Allow GitHub Actions to create and approve pull requests**, or the Version Packages PR can't be opened.
- **Branch protection** for `main` (recommended): require PRs and require the `ci` status check to pass.

Note: PRs opened with the default `GITHUB_TOKEN` (like Version Packages) don't trigger other workflows, so CI won't run on that PR automatically. It only bumps versions, so that's usually fine. If branch protection requires the `ci` check, you'll need to close and reopen the PR, or give the action a personal access token.

## License

[MIT](LICENSE)
