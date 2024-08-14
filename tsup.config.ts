import { defineConfig } from 'tsup'
import { execSync } from 'child_process'

export default defineConfig((options) => {
  const { env } = options

  const isDev = env!.NODE_ENV !== 'production'
  return {
    entry: ['src/background', 'src/content'],
    outDir: `output/${isDev ? 'dev' : 'prod'}`,
    splitting: false,
    minify: false,
    format: 'iife',
    watch: isDev ? ['src/background', 'src/content', 'src/assets/icon'] : false,
    onSuccess: async () => {
      const configFile = isDev ? '.env.development' : '.env.production'
      execSync(`tsx --env-file=${configFile} ./scripts/move-files.ts `, {
        stdio: 'inherit'
      })
      execSync(`tsx --env-file=${configFile} ./scripts/build-manifest.ts `, {
        stdio: 'inherit'
      })
    }
  }
})
