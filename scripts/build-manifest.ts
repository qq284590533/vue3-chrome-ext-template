import fs from 'fs-extra'
import { r } from './utils'
import { IS_DEV } from './utils'
import { generateManifest } from '@/manifest'

const outputPath = r(`output/${IS_DEV ? 'dev' : 'prod'}`)
export async function createManifest() {
  const manifestUrl = r(outputPath, 'manifest.json')
  await fs.ensureFile(manifestUrl)
  fs.writeJSON(manifestUrl, generateManifest(IS_DEV), {
    spaces: 2
  })
}

createManifest()
