import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initApiUrl } from './utils/api'
import { createPinia } from 'pinia'

initApiUrl().then(() => {
  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
})





