<template>
  <div>
    <h1>pinia-persist-plugin demo</h1>

    <h2>Counter store</h2>
    <p>counter is {{ counter }}</p>
    <p>double is {{ doubleCounter }}</p>
    <button @click="counterStore.increment">
      increment
    </button>

    <h2>Omit store</h2>
    <p>test counter is {{ testStore.test }}</p>
    <button @click="testStore.increment">
      increment
    </button>

    <h2>Tips</h2>
    <p>All changes will be persisted in configured store asynchronous</p>
    <p>Open browser and switch to Application tab to see all changes</p>

    <h2>For more information</h2>
    <a href="https://github.com/guygubaby/pinia-persist-plugin">pinia-persist-plugin</a>
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
