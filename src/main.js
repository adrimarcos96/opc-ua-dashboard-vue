import './assets/css/main.css'

import { createApp } from 'vue'
import SvgIcon from 'vue3-icon'
import { router } from './routes'
import App from './App.vue'

const app = createApp(App)

app.component('svg-icon', SvgIcon)
app.use(router)
app.mount('#app')
