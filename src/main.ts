import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import Alpine from 'alpinejs'
import VueWriter from "vue-writer";
import { createHead } from '@vueuse/head'
import { initializeApp } from "firebase/app"
import { getPerformance } from "firebase/performance"
import VueApexCharts from "vue3-apexcharts"
import VueLazyload from 'vue-lazyload'
import DisableDevtool from 'disable-devtool'

const meta = createHead()
createApp(App)
.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://ik.imagekit.io/odbmay3h6/error.jpg?updatedAt=1724846706951',
})
.use(VueApexCharts)
.use(VueWriter)
.use(meta).use(router)
.mount('#app')

window.Alpine = Alpine
Alpine.store('page', {
    title: '404 Not Found',
})
Alpine.start()

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    databaseURL: process.env.VITE_DATABASE_URL,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESS_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    measurementId: process.env.VITE_MEASURE_ID
};

const app = initializeApp(firebaseConfig)
getPerformance(app)

//Disable Devtool
DisableDevtool()