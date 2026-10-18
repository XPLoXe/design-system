export type AleSkin = 'default' | 'cyberpunk'

const COOKIE_NAME = 'ale-skin'
const BOOT_CLASS = 'ale-cp-boot'

// Shares the choice across subdomains (e.g. spendy.alebocchicchio.com) when
// served from `site.domain`; falls back to a host-only cookie elsewhere (localhost).
function resolveCookieDomain(domain: string, hostname: string) {
  if (!domain) return undefined
  return hostname === domain || hostname.endsWith(`.${domain}`) ? `.${domain}` : undefined
}

export function useSkin() {
  const appConfig = useAppConfig()
  const enabled = computed(() => appConfig.site.cyberpunk !== false)

  const cookie = useCookie<AleSkin>(COOKIE_NAME, {
    default: () => 'default',
    domain: resolveCookieDomain(appConfig.site.domain, useRequestURL().hostname),
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  const state = useState<AleSkin>(COOKIE_NAME, () => cookie.value === 'cyberpunk' ? 'cyberpunk' : 'default')

  const skin = computed<AleSkin>(() => enabled.value ? state.value : 'default')
  const isCyberpunk = computed(() => skin.value === 'cyberpunk')

  function setSkin(next: AleSkin) {
    state.value = next
    cookie.value = next

    // One-shot glitch when switching on (skipped by CSS for reduced motion)
    if (import.meta.client && next === 'cyberpunk') {
      const root = document.documentElement
      root.classList.remove(BOOT_CLASS)
      void root.offsetWidth
      root.classList.add(BOOT_CLASS)
      setTimeout(() => root.classList.remove(BOOT_CLASS), 600)
    }
  }

  function toggle() {
    setSkin(isCyberpunk.value ? 'default' : 'cyberpunk')
  }

  return {
    skin,
    isCyberpunk,
    enabled,
    setSkin,
    toggle,
  }
}
