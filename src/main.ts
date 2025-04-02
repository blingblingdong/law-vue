import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initApiUrl } from './utils/api'

initApiUrl().then(() => {
  createApp(App).mount('#app')
})
