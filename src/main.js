import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'

import router from './router'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
