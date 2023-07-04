import { createApp } from 'vue'
import "@mdi/font/css/materialdesignicons.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import './style.css'
import App from './App.vue'
import router from './routes/router';

createApp(App)
	.use(router)
	.mount('#app')
