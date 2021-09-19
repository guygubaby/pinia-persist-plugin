<template>
  <div>
    <h1>App</h1>
    <p>counter is {{ counter }}</p>
    <p>double is {{ doubleCounter }}</p>
    <button @click="counterStore.increment">
      increment
    </button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from './store/counter'

const counterStore = useCounterStore()

const { counter, doubleCounter } = storeToRefs(counterStore)
</script>
