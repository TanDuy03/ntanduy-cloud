import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import App from './App.vue'
import Alpine from 'alpinejs'
import { createHead } from '@vueuse/head'
import VueWriter from "vue-writer";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const meta = createHead()
createApp(App).use(VueWriter).use(meta).use(router).mount('#app')

window.Alpine = Alpine

Alpine.store('page', {
    title: 'Not Found 404',
    products: ['Swiss Alp Chocolate', 'Car Alpine A110'],
})

Alpine.start()

const firebaseConfig = {
    apiKey: "AIzaSyBVZdkhPAyFqYC0exPOlC2-pag28Z5cZxk",
    authDomain: "ntanduy-2eb98.firebaseapp.com",
    databaseURL: "https://ntanduy-2eb98-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ntanduy-2eb98",
    storageBucket: "ntanduy-2eb98.appspot.com",
    messagingSenderId: "586088571005",
    appId: "1:586088571005:web:5f0c209cbfe20d57bb9114",
    measurementId: "G-9DDEDF74N2"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);