import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', component:() => import('./components/Home.vue'), 
    props: {name: 'Nguyen Tan Duy'} 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', component:() => import('./components/NotFound.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router