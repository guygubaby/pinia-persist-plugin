// eslint-disable-next-line import/named
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'
import App from './App.vue'

const pinia = createPinia()
const plugin = createPersistPlugin()
pinia.use(plugin)

const app = createApp(App)

app.use(pinia)

app.mount('#app')
