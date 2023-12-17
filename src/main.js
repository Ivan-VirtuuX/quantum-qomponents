import App from './App.vue'
import Home from '@/pages/Home.vue'
import Favorites from '@/pages/Favorites.vue'

import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import vClickOutside from 'v-click-outside'

import './assets/main.scss'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)
app.use(vClickOutside)

app.mount('#app')
