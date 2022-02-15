import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as plugins from '@/plugins'
import '@/assets/index.sass'

store.$axios = plugins.axios
store.$env = process.env

const app = createApp(App)

app.use(store).use(router).mount('#app')
