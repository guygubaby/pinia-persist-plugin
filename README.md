# pinia-persist-plugin

## Opinionated persist plugin for [pinia@next](https://pinia.esm.dev/)

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
  storageKey?: string // which key to persist the store state
  delay?: number // debounced persistent delay
}

// The default config is here
const defaultOptions: Required<Options> = {
  storage: window.sessionStorage,
  storageKey: 'pinia-persist-plugin-state',
  delay: 300,
}

const plugin = createPersistPlugin(options?: Options)
```

## Example

Can be accessed from [playground](https://github.com/guygubaby/pinia-persist-plugin/tree/main/playground) folder
