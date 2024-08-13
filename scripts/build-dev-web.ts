import fs from 'fs-extra'
import { r } from './utils'
import SERVE_CONFIG from '../serve.config'

const { host, port } = SERVE_CONFIG

async function buildHTML() {
  const views = ['options', 'popup']

  for (const view of views) {
    await fs.ensureDir(r(`output/dev/${view}`))
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8')
    data = data
      .replace('"./main.ts"', `"http://${host}:${port}/${view}/main.ts"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite dev server did not start</div>'
      )
    await fs.writeFile(r(`output/dev/${view}/index.html`), data, 'utf-8')
  }
}

buildHTML()
