import { createApp } from 'vue'
import App from '../app/index.vue'
import '../styles/tailwind.css'

function createExtContainer() {
  const container = document.createElement('div')
  document.body.append(container)
  return container
}

createApp(App).mount(createExtContainer())
