import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/Home.vue'
import NotFound from './components/NotFound.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router