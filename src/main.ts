import * as firebase from 'firebase/app'
import 'firebase/auth'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/tailwind.css'
import VueSimplePicker from 'vue-simple-picker'

const firebaseConfig = {
    apiKey: 'AIzaSyD-GsXECjXGXiEHgYE0Vfk4DlbqrEB-3sI',
    authDomain: 'yamakawa-training.firebaseapp.com',
    projectId: 'yamakawa-training',
    messagingSenderId: '9518379214',
    appId: '1:9518379214:web:19e4b6adced98295ed209f'
}

firebase.initializeApp(firebaseConfig)

// 謎の型エラーがでる(betaだから？)
// @ts-ignore
createApp(App)
    .use(router)
    // @ts-ignore
    .use(VueSimplePicker)
    .mount('#app')
