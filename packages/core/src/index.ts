import type { PiniaPluginContext, StateTree } from 'pinia'
import { debounce } from '@bryce-loskie/utils'

type Nullable<T> = T | null

export interface Options {
  storage?: Storage
  storageKey?: string
  delay?: number
}

interface PluginPayload extends Omit<Required<Options>, 'delay'> {
  context: PiniaPluginContext
}

const defaultOptions: Required<Options> = {
  storage: window.sessionStorage,
  storageKey: 'pinia-persist-plugin-state',
  delay: 300,
}

const getPersistedData = (storage: Storage, key: string, storageKey: string) => {
  const oldData = storage.getItem(storageKey)
  if (!oldData) return null

  let res: Nullable<Record<string, StateTree>> = null
  try {
    res = JSON.parse(oldData ?? '')
  }
  catch (error) {
    res = null
  }
  return res?.[key] || null
}

const persistState = (storage: Storage, storageKey: string, state: Record<string, StateTree>) => {
  storage.setItem(storageKey, JSON.stringify(state))
}

let debouncedPersist: Nullable<debounce<typeof persistState>> = null

const persistPlugin = ({ context, storage, storageKey }: PluginPayload) => {
  const { store, pinia } = context
  const persistedData = getPersistedData(storage, store.$id, storageKey)

  if (persistedData)
    store.$patch(persistedData)

  store.$subscribe(() => {
    debouncedPersist?.(storage, storageKey, pinia.state.value)
  })
}

export const createPersistPlugin = (options?: Options) => {
  options = {
    ...defaultOptions,
    ...options,
  }

  const { storage: ds, storageKey: dsk, delay: dd } = defaultOptions
  const { storage = ds, storageKey = dsk, delay = dd } = options

  debouncedPersist = debounce(delay, persistState)

  return (context: PiniaPluginContext) => { persistPlugin({ context, storage, storageKey }) }
}
