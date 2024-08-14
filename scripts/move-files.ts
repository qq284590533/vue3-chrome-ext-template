import { resolve } from 'path'
import fs from 'fs-extra'
import { IS_DEV } from './utils'
import { rimrafSync } from 'rimraf'
;(async () => {
  try {
    const outputPath = resolve(`output/${IS_DEV ? 'dev' : 'prod'}`)
    rimrafSync(resolve(outputPath, 'assets'))
    await fs.copy(resolve('src/assets'), resolve(outputPath, 'assets'), {
      overwrite: true
    })
  } catch (error) {
    console.error(error)
  }
})()
