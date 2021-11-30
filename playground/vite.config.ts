import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      'pinia-persist-plugin': resolve(__dirname, '../packages/core/src/index.ts'),
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  plugins: [Vue()],
  optimizeDeps: {
    exclude: ['pinia-persist-plugin'],
  },
})
