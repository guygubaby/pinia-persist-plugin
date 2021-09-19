import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
  },
})
