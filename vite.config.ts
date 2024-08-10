import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@/': resolve(__dirname, 'src/')
      }
    },
    plugins: [vue()]
  }
})
