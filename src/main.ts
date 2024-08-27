import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import Alpine from 'alpinejs'
import VueWriter from "vue-writer";
import { createHead } from '@vueuse/head'
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getPerformance } from "firebase/performance"
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import VueApexCharts from "vue3-apexcharts"

const meta = createHead()
createApp(App).use(VueApexCharts).use(VueWriter).use(meta).use(router).mount('#app')

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
// getAnalytics(app)
getPerformance(app)
inject()
injectSpeedInsights()
