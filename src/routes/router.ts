// const router = [];

import { createRouter, createWebHashHistory } from "vue-router";
import Index from "./Index.vue";
import Projects from "./Projects.vue"

// export default router;
export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: Index },
		{ path: '/projects', component: Projects },
		// { path: '/about', component: About },
	]
})
