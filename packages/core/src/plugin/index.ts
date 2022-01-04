import type { PiniaPluginContext, StateTree } from 'pinia'
import { queueJob } from './scheduler'

type Nullable<T> = T | null

export interface Options {
  /**
   * which store to persist the state
   */
  storage?: Storage
  /**
   * which key to persist the state
   */
  storageKey?: string
  /**
   * store id[s] to omit persist
   */
  omits?: string[] | string
}

interface PluginPayload extends Required<Options> {
  context: PiniaPluginContext
}

const defaultOptions: Required<Options> = {
  storage: window.sessionStorage,
  storageKey: 'pinia-persist-plugin-state',
  omits: [],
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

const toArray = (value: string | string[]): string[] => {
  if (Array.isArray(value)) return value
  return [value]
}

const omitStore = (target: Record<string, StateTree>, omits: string[]): Record<string, StateTree> => {
  return Object.keys(target).reduce((acc, cur) => {
    if (!omits.includes(cur))
      acc[cur] = target[cur]
    return acc
  }, {} as Record<string, StateTree>)
}

const persistPlugin = ({ context, storage, storageKey, omits }: PluginPayload) => {
  const omitKeys = toArray(omits)

  const { store, pinia } = context

  if (!omitKeys.includes(store.$id)) {
    const persistedData = getPersistedData(storage, store.$id, storageKey)
    if (persistedData)
      store.$patch(persistedData)
  }

  store.$subscribe(() => {
    queueJob(() => {
      const state = omitStore(pinia.state.value, omitKeys)
      persistState(storage, storageKey, state)
    })
  })
}

export const createPersistPlugin = (options?: Options) => {
  const { storage: ds, storageKey: dk } = defaultOptions
  const { storage = ds, storageKey = dk, omits = [] } = options ?? {}

  return (context: PiniaPluginContext) => persistPlugin({ context, storage, storageKey, omits })
}
