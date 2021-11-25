import type { Pinia } from 'pinia'

const toArray = <T>(value: T | T[]): T[] => { return Array.isArray(value) ? value : [value] }

export const resetStores = (store: Pinia, omits: (string[] | string) = []) => {
  omits = toArray(omits)
  const storeSet = store._s
  const storeList = [...storeSet.values()].filter(store => !omits.includes(store.$id))
  storeList.forEach(_store => _store.$reset())
}
