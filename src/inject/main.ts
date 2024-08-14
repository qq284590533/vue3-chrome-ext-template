import { createApp } from 'vue'
import App from './index.vue'
import '@/styles/tailwind.css'
import '@/styles/style.css'

function createExtContainer() {
  const container = document.createElement('div')
  document.body.parentNode!.appendChild(container)

  return container
}

createApp(App).mount(createExtContainer())
