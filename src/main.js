import userIDStore from './stores/userid'

import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css"

import Main from './pages/Main.vue'
import Login from './pages/Login.vue'

import App from './App.vue'

const app = createApp(App)

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/', name: 'Dashboard', component: Main}
  ]

const router = createRouter({
    history: createWebHistory(""),
    routes
})

export default router

app.use(router)
app.use(userIDStore)
app.use(ToastPlugin)
app.mount('#app')
