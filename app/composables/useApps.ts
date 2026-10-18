export interface AleApp {
  /** Stable id, matched against the navbar `current` prop. */
  id: string
  name: string
  url: string
  icon?: string
  description?: string
  /** `soon` apps are listed but not linked. */
  status?: 'live' | 'soon'
}

// Hardcoded for now. To load from a manifest later, populate this state
// (e.g. with `useFetch` in a plugin); consumers only depend on `apps`.
const defaultApps: AleApp[] = [
  {
    id: 'landing',
    name: 'Home',
    url: 'https://alebocchicchio.com',
    icon: 'i-lucide-house',
    status: 'live',
  },
  {
    id: 'spendy',
    name: 'Spendy',
    url: 'https://spendy.alebocchicchio.com',
    icon: 'i-lucide-wallet',
    description: 'Expense tracking',
    status: 'live',
  },
  {
    id: 'placeholder-a',
    name: 'Project A',
    url: '',
    icon: 'i-lucide-box',
    status: 'soon',
  },
  {
    id: 'placeholder-b',
    name: 'Project B',
    url: '',
    icon: 'i-lucide-box',
    status: 'soon',
  },
]

export function useApps() {
  const apps = useState<AleApp[]>('ale-apps', () => defaultApps)

  return {
    apps: readonly(apps),
  }
}
