import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
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
