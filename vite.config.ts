import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import SERVE_CONFIG from './serve.config'

const r = (...path: string[]) => resolve(__dirname, ...path)
const { host, port } = SERVE_CONFIG

export default defineConfig(() => {
  console.log('process.env', process.env.PORT)
  return {
    root: r('src'),
    resolve: {
      alias: {
        '@/': r('src/')
      }
    },
    server: {
      port,
      host
    },
    build: {
      outDir: r('output/prod'),
      emptyOutDir: false,
      rollupOptions: {
        input: {
          options: r('src/options/index.html'),
          popup: r('src/popup/index.html'),
          app: r('src/app/main.ts')
        },
        output: {
          entryFileNames: (chunk) => {
            console.log(chunk)
            if (chunk.name === 'app') {
              return 'app/main.js'
            } else {
              return '[name]/[name]-[hash].js'
            }
          },
          assetFileNames: (assetInfo) => {
            const { type, name } = assetInfo
            if (type === 'asset' && name && /(\.css|\.scss)$/i.test(name)) {
              return 'assets/[name].[ext]'
            }
            return 'assets/name1-[hash].[ext]'
          }
        }
      }
    },
    plugins: [vue()]
  }
})
