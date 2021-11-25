import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'

const pinia = createPinia()
const plugin = createPersistPlugin()
pinia.use(plugin)

export default pinia
