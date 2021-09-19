<template>
  <div>
    <h1>App</h1>
    <p>counter is {{ counter }}</p>
    <p>double is {{ doubleCounter }}</p>
    <button @click="counterStore.increment">
      increment
    </button>

    <p>Another store</p>
    <p>test is {{ testStore.test }}</p>
    <button @click="testStore.increment">
      increment
    </button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from './store/counter'
import { useTestStore } from './store/test'

const counterStore = useCounterStore()

const { counter, doubleCounter } = storeToRefs(counterStore)

const testStore = useTestStore()
</script>
