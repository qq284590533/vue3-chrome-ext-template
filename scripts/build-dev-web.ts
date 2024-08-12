import fs from 'fs-extra'
import chokidar from 'chokidar'
import { r, IS_DEV } from './utils'
import SERVE_CONFIG from '../serve.config'

const { host, port } = SERVE_CONFIG

async function stubIndexHtml() {
  const views = ['options', 'popup']

  for (const view of views) {
    await fs.ensureDir(r(`output/dev/${view}`))
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8')
    data = data
      .replace('"./main.ts"', `"http://${host}:${port}/${view}/main.ts"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>'
      )
    await fs.writeFile(r(`output/dev/${view}/index.html`), data, 'utf-8')
  }
}

if (IS_DEV) {
  stubIndexHtml()
  chokidar.watch(r('src/**/*.html')).on('change', () => {
    stubIndexHtml()
  })
}
