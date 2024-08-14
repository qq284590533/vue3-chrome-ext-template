import { IS_DEV } from '@/utils'
import SERVE_CONFIG from '../../serve.config'

const { host, port } = SERVE_CONFIG
class Content {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.inject.bind(this))
  }
  inject() {
    const script = document.createElement('script')
    // script.type = 'text/javascript'
    script.setAttribute('type', 'module')
    script.src = IS_DEV
      ? `http://${host}:${port}/inject/main.ts`
      : chrome.runtime.getURL('inject/main.js')
    // script.onload = () => {
    //   document.body.removeChild(script)
    // }
    document.body.appendChild(script)
  }
}

new Content()
