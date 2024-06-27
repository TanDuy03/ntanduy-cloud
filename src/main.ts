import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

createApp(App).mount('#app')

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESS_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASURE_ID
  };

const app = initializeApp(firebaseConfig);
getAnalytics(app);
