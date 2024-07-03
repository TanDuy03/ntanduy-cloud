import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}

const routes: RouteRecordRaw[] = [
  { 
    path: '/', component:() => import('../components/Home.vue'), 
    meta: {
      title: 'Nguyen Tan Duy'
    },
    props: {
      name: 'Nguyen Tan Duy',
      description: 'Software Developer',
    }
  },
  { 
    path: '/register', component:() => import('../components/auth/Register.vue'),
    meta: {
      title: 'Register'
    } 
  },
  { 
    path: '/login', component:() => import('../components/auth/Login.vue'),
    meta: {
      title: 'Login'
    } 
  },
  { 
    path: '/welcome', component:() => import('../components/Welcome.vue'),
    meta: {
      title: 'Welcome',
    },
  },
  { 
    path: '/:pathMatch(.*)*', component:() => import('../components/NotFound.vue'),
    meta: {
      title: 'Not Found'
    } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from) => {
  document.title = to.meta?.title ?? 'Nguyen Tan Duy'
})

export default router