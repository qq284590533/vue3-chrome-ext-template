import { defineConfig } from 'tsup'
import { execSync } from 'child_process'

export default defineConfig((options) => {
  const { env } = options
  console.log(env)
  const isDev = env!.NODE_ENV !== 'production'
  return {
    entry: ['src/background', 'src/content'],
    outDir: `output/${isDev ? 'dev' : 'prod'}`,
    splitting: false,
    minify: false,
    format: 'iife',
    onSuccess: async () => {
      execSync(
        `tsx --env-file=${isDev ? '.env.development' : '.env.production'} ./scripts/move-files.ts `,
        {
          stdio: 'inherit'
        }
      )
      execSync(
        `tsx --env-file=${isDev ? '.env.development' : '.env.production'} ./scripts/build-manifest.ts `,
        {
          stdio: 'inherit'
        }
      )
    }
  }
})
