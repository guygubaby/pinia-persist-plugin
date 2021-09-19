import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => ({
    test: 0,
  }),
  actions: {
    increment() {
      this.test++
    },
  },
})
