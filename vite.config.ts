import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import srcReplace from './plugins/vite-plugin-content-replace'
import SERVE_CONFIG from './serve.config'

const r = (...path: string[]) => resolve(__dirname, ...path)
const { host, port } = SERVE_CONFIG

export default defineConfig(() => {
  const isDev = process.env.NODE_ENV !== 'production'
  const plugins = [vue()]

  // 开发环境替换组件中的资源文件路径
  if (isDev) {
    plugins.push(
      srcReplace({
        match: /@\/assets\//g,
        replacement: `http://${host}:${port}/assets/`,
        include: [/\.vue$/]
      })
    )
  }

  return {
    root: r('src'),
    base: isDev ? `http://${host}:${port}` : undefined,
    resolve: {
      alias: {
        '@/': `${r('src')}/`
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
          inject: r('src/inject/main.ts')
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === 'inject') {
              return 'inject/main.js'
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
    plugins
  }
})
