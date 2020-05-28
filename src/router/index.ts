import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        // 謎の型エラーがでる(betaだから？)
        // @ts-ignore
        component: Home
    },
    {
        path: '/',
        name: 'Home',
        // 謎の型エラーがでる(betaだから？)
        // @ts-ignore
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
