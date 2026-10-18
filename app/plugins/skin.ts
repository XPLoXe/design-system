// Sets `data-skin` on <html> during SSR, so the page never flashes the wrong skin.
export default defineNuxtPlugin(() => {
  const { isCyberpunk } = useSkin()

  useHead({
    htmlAttrs: {
      'data-skin': computed(() => isCyberpunk.value ? 'cyberpunk' : undefined),
    },
  })
})
