import type { PiniaPluginContext, StateTree } from 'pinia'
import { queueJob } from './scheduler'

type Nullable<T> = T | null

export interface Options {
  storage?: Storage
  storageKey?: string
}

interface PluginPayload extends Required<Options> {
  context: PiniaPluginContext
}

const defaultOptions: Required<Options> = {
  storage: window.sessionStorage,
  storageKey: 'pinia-persist-plugin-state',
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

const persistPlugin = ({ context, storage, storageKey }: PluginPayload) => {
  const { store, pinia } = context
  const persistedData = getPersistedData(storage, store.$id, storageKey)

  if (persistedData)
    store.$patch(persistedData)

  store.$subscribe(() => {
    queueJob(() => persistState(storage, storageKey, pinia.state.value))
  })
}

export const createPersistPlugin = (options?: Options) => {
  const { storage: ds, storageKey: dk } = defaultOptions
  const { storage = ds, storageKey = dk } = options ?? {}

  return (context: PiniaPluginContext) => { persistPlugin({ context, storage, storageKey }) }
}
