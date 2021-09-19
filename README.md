# pinia-persist-plugin

## An opinionated persist plugin for `pinia@next`

[![NPM version](https://img.shields.io/npm/v/pinia-persist-plugin?color=a1b858&label=)](https://www.npmjs.com/package/pinia-persist-plugin)

## Get Started

```bash
pnpm i pinia-persist-plugin
```

## Usage

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'

const pinia = createPinia()
const plugin = createPersistPlugin()

pinia.use(plugin)

const app = createApp(App)

app.use(pinia)
```

## Configuration Options

```typescript
interface Options {
  storage?: Storage // where to store the persistent
  watchOptions?: WatchOptions // watchOptions for `debouncedWatch`
  storageKey?: string // which key to persist the store state
}

const plugin = createPersistPlugin(options?: Options)
```

## Example

Can be accessed from `playground` folder

## License

[MIT](./LICENSE) License © 2021 [guygubaby](https://github.com/guygubaby)
