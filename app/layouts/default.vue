<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <AleNavbar :current="appConfig.site.appId" />

    <UMain>
      <slot />
    </UMain>

    <AleFooter />
  </div>
</template>
