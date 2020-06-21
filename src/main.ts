import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/tailwind.css'
import VueSimplePicker from 'vue-simple-picker'

// 謎の型エラーがでる(betaだから？)
// @ts-ignore
createApp(App)
    .use(router)
    // @ts-ignore
    .use(VueSimplePicker)
    .mount('#app')
