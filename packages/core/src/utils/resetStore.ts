import { getActivePinia } from 'pinia'

const toArray = <T>(value: T | T[]): T[] => { return Array.isArray(value) ? value : [value] }

export const resetStore = (omits: (string[] | string) = []) => {
  const store = getActivePinia()

  if (!store)
    throw new Error('No store found, [resetStore] can only be used after pinia has been initialized')

  omits = toArray(omits)
  const storeSet = store._s
  const storeList = [...storeSet.values()].filter(store => !omits.includes(store.$id))
  storeList.forEach(_store => _store.$reset())
}
