import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'

const pinia = createPinia()
pinia.use(createPersistPlugin({
  omits: 'test',
}))

export default pinia
