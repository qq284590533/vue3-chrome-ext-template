import fs from 'fs-extra'
import { r } from './utils'
import { IS_DEV } from './utils'
import { Manifest } from 'webextension-polyfill'
import pkg from '../package.json'
import SERVE_CONFIG from '../serve.config'

const { host, port } = SERVE_CONFIG
const outputPath = r(`output/${IS_DEV ? 'dev' : 'prod'}`)
function getManifest(): Manifest.WebExtensionManifest {
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.name + `${IS_DEV ? '-dev' : ''}`,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/icons/icon32.png',
      default_popup: './popup/index.html'
    },
    background: {
      service_worker: './background/index.global.js'
    },
    options_ui: {
      page: './options/index.html',
      open_in_tab: true
    },
    permissions: ['activeTab', 'scripting'],
    host_permissions: ['<all_urls>'],
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*'],
        js: ['./content/index.global.js'],
        css: IS_DEV ? [] : ['./assets/app.css', './assets/tailwind.css'],
        run_at: 'document_start'
      }
    ],
    web_accessible_resources: [
      {
        resources: ['/app/main.js', '/assets/*'],
        matches: ['http://*/*', 'https://*/*']
      }
    ],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'"
    }
  }
  if (IS_DEV) {
    // this is required on dev for Vite script to load
    manifest.content_security_policy = {
      extension_pages: `script-src 'self' http://${host}:${port}; object-src 'self'`
    }
  }
  return manifest
}

export async function createManifest() {
  const manifestUrl = r(outputPath, 'manifest.json')
  await fs.ensureFile(manifestUrl)
  fs.writeJSON(manifestUrl, await getManifest(), {
    spaces: 2
  })
}

createManifest()
