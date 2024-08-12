import { resolve } from 'path'
import fs from 'fs-extra'
import { IS_DEV } from './utils'
;(async () => {
  try {
    const outputPath = resolve(`output/${IS_DEV ? 'dev' : 'prod'}`)
    await fs.copy(
      resolve('src/assets/icons'),
      resolve(outputPath, 'assets/icons'),
      {
        overwrite: true
      }
    )
  } catch (error) {
    console.error(error)
  }
})()
