import Vue from 'vue'
import App from './App.vue'

import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import './assets/css/materialdesignicons.min.css'
import './assets/fonts/Roboto-Regular.ttf'

Vue.use(Vuetify);
const vuetify = new Vuetify({
	theme: {
		themes: {
			light: { primary: "#FF8000" },
			dark: { primary: "#FF8000" }
		},
	}
});

new Vue({
	vuetify,
	// store,
	// router,
	render: h => h(App),
}).$mount('#app')
