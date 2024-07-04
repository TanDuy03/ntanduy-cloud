import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'
import { getAuth } from "firebase/auth"
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
      title: 'Login',
    } 
  },
  { 
    path: '/welcome', component:() => import('../components/Welcome.vue'),
    meta: {
      title: 'Welcome',
      isLoggedIn: true,
    },
  },
  { 
    path: '/reset-password', component:() => import('../components/auth/ResetPassword.vue'),
    meta: {
      title: 'Reset Password',
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
const checkLoggIn = localStorage.getItem('isLoggedIn') == 'true'
router.beforeEach((to, _from, next) => {
  document.title = to.meta?.title ?? 'Nguyen Tan Duy'

  const auth = getAuth()
  if(to.matched.some((record) => record.meta.isLoggedIn)) {
    if(auth.currentUser || checkLoggIn) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      setTimeout(() => {
        toast.warning('You are not logged in', {
          autoClose: 1600,
        })
      }, 500)
    }
  } else {
    next()
  }
})

export default router