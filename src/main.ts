import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import App from './App.vue'
import Alpine from 'alpinejs'

createApp(App).use(router).mount('#app')

window.Alpine = Alpine

Alpine.store('page', {
    title: 'Not Found 404',
    products: ['Swiss Alp Chocolate', 'Car Alpine A110'],
})

Alpine.start()