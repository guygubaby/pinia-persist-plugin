import type { PiniaPluginContext, StateTree } from 'pinia'
import { effectScope, onScopeDispose } from 'vue'
import type { EffectScope } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import type { DebouncedWatchOptions } from '@vueuse/core'

type Nullable<T> = T | null

type WatchOptions = Omit<DebouncedWatchOptions<boolean>, 'deep'>

export interface Options {
  storage?: Storage
  watchOptions?: WatchOptions
  storageKey?: string
}

interface PluginPayload extends Required<Options> {
  context: PiniaPluginContext
}

const defaultOptions: Required<Options> = {
  storage: window.sessionStorage,
  storageKey: 'pinia-persist-plugin-state',
  watchOptions: {
    flush: 'post',
    debounce: 300,
    immediate: false,
  },
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

const persistPlugin = ({ context, storage, storageKey, watchOptions }: PluginPayload) => {
  const { store, pinia } = context
  const persistedData = getPersistedData(storage, store.$id, storageKey)

  if (persistedData)
    store.$patch(persistedData)

  let scope: Nullable<EffectScope> = effectScope(true)

  scope.run(() => {
    debouncedWatch(
      () => store.$state,
      () => {
        storage.setItem(storageKey, JSON.stringify(pinia.state.value))
      },
      {
        deep: true,
        ...defaultOptions.watchOptions,
        ...watchOptions,
      })
  })

  onScopeDispose(() => {
    scope?.stop()
    scope = null
  })
}

export const createPersistPlugin = (options?: Options) => {
  options = {
    ...defaultOptions,
    ...options,
  }

  const { storage = defaultOptions.storage, watchOptions = defaultOptions.watchOptions, storageKey = defaultOptions.storageKey } = options
  return (context: PiniaPluginContext) => { persistPlugin({ context, storage, storageKey, watchOptions }) }
}
